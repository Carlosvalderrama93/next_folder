/**
 * End-to-End Functional Verification Suite.
 * Starts Next.js production server and tests all routes, fallbacks, and APIs.
 *
 * Run with: node scripts/verify-e2e.mjs
 */

import { spawn } from "node:child_process";
import assert from "node:assert/strict";

const PORT = 3008;
const BASE_URL = `http://localhost:${PORT}`;

let serverProcess = null;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`${BASE_URL}/robots.txt`);
      if (res.ok) return;
    } catch {
      // server still starting
    }
    await sleep(400);
  }
  throw new Error(`Server did not respond within ${timeoutMs}ms`);
}

async function testRoute(name, path, validator) {
  process.stdout.write(`  Testing ${name} (${path})... `);
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Expected HTTP 200, got ${res.status} ${res.statusText}`);
  }
  if (validator) {
    const text = await res.text();
    await validator(text, res);
  }
  console.log("✔ PASS");
}

async function testApi(name, path, options, validator) {
  process.stdout.write(`  Testing API ${name} (${path})... `);
  const res = await fetch(`${BASE_URL}${path}`, options);
  await validator(res);
  console.log("✔ PASS");
}

async function runTests() {
  console.log("\n========================================================");
  console.log("🚀 Starting End-to-End Functional Verification Suite");
  console.log("========================================================\n");

  console.log("1. Starting Next.js production server on port", PORT);
  serverProcess = spawn("npx", ["next", "start", "-p", String(PORT)], {
    stdio: "pipe",
    detached: true,
  });

  serverProcess.stderr.on("data", (d) => {
    const msg = d.toString();
    if (!msg.includes("ECONNREFUSED")) {
      // Only log unexpected errors
      process.stderr.write(msg);
    }
  });

  await waitForServer();
  console.log("   Server is healthy and ready.\n");

  console.log("2. Verifying Core Navigation & Localized Pages:");
  await testRoute("Home (EN)", "/en", (html) => {
    assert.ok(html.includes("Carlos Valderrama"), "Should contain brand name");
    assert.ok(html.includes("Open Positions"), "Should contain EN heading");
  });

  await testRoute("Home (ES)", "/es", (html) => {
    assert.ok(html.includes("Carlos Valderrama"), "Should contain brand name");
    assert.ok(html.includes("Posiciones Abiertas"), "Should contain ES heading");
  });

  await testRoute("Jobs List (EN)", "/en/jobs", (html) => {
    assert.ok(html.includes("Open Positions"), "Should contain Jobs heading");
  });

  await testRoute("Jobs List (ES)", "/es/jobs", (html) => {
    assert.ok(html.includes("Posiciones Abiertas"), "Should contain ES Jobs heading");
  });

  await testRoute("Job Detail (Static Fallback ID)", "/en/jobs/1", (html) => {
    assert.ok(html.length > 500, "Should render job detail");
  });

  await testRoute("About Page (EN)", "/en/about", (html) => {
    assert.ok(html.includes("Carlos Valderrama"), "Should contain profile");
  });

  await testRoute("About Page (ES)", "/es/about", (html) => {
    assert.ok(html.includes("Carlos Valderrama"), "Should contain profile");
  });

  await testRoute("Contact Page (EN)", "/en/contact", (html) => {
    assert.ok(html.includes("Full Name"), "Should contain localized form field");
  });

  await testRoute("Contact Page (ES)", "/es/contact", (html) => {
    assert.ok(html.includes("Nombre completo"), "Should contain localized form field in ES");
  });

  console.log("\n3. Verifying Articles & Static Slug 404 Prevention:");
  await testRoute("Articles List (EN)", "/en/articles", (html) => {
    assert.ok(html.includes("Articles"), "Should render Articles page");
  });

  await testRoute("Articles List (ES)", "/es/articles", (html) => {
    assert.ok(html.includes("Artículos"), "Should render ES Articles page");
  });

  await testRoute("Static Article Detail (Slug 1)", "/en/articles/remote-interview-tips", (html, res) => {
    assert.equal(res.status, 200, "Should return HTTP 200");
    assert.ok(html.includes("How to Ace a Remote Interview"), "Should render remote interview tips article");
    assert.ok(html.includes("5 core strategies"), "Should render custom editorial blocks");
  });

  await testRoute("Static Article Detail (Slug 2)", "/en/articles/top-skills-it-2025", (html, res) => {
    assert.equal(res.status, 200, "Should return HTTP 200");
    assert.ok(html.includes("Top 10 Skills for IT Professionals in 2025"), "Should render IT skills article");
    assert.ok(html.includes("Distributed Architecture"), "Should render custom editorial blocks");
  });

  await testRoute("Static Article Detail (ES locale)", "/es/articles/remote-interview-tips", (html, res) => {
    assert.equal(res.status, 200, "Should return HTTP 200");
    assert.ok(html.includes("How to Ace a Remote Interview"), "Should render in ES without 404");
  });

  console.log("\n4. Verifying Search Engines & Crawlers:");
  await testRoute("Robots.txt", "/robots.txt", (text) => {
    assert.ok(text.toLowerCase().includes("user-agent"), "Should be valid robots.txt");
  });

  await testRoute("Sitemap.xml", "/sitemap.xml", (xml) => {
    assert.ok(xml.includes("<urlset"), "Should be valid sitemap XML");
    assert.ok(xml.includes("/jobs/"), "Should include canonical /jobs/ routes");
    assert.ok(xml.includes("/articles/"), "Should include /articles/ routes");
  });

  console.log("\n5. Verifying API Intake Endpoints & Validation:");
  await testApi(
    "Contact Empty Payload Validation",
    "/api/contact",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    },
    async (res) => {
      assert.equal(res.status, 400, "Empty payload should return 400");
      const json = await res.json();
      assert.ok(json.errors?.name, "Should complain about missing name");
      assert.ok(json.errors?.email, "Should complain about missing email");
    }
  );

  await testApi(
    "Contact Invalid Email Validation",
    "/api/contact",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Carlos", email: "not-an-email", message: "Hello" }),
    },
    async (res) => {
      assert.equal(res.status, 400, "Invalid email should return 400");
      const json = await res.json();
      assert.ok(json.errors?.email, "Should flag invalid email");
    }
  );

  await testApi(
    "Contact Valid Submission",
    "/api/contact",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Candidate",
        email: "test@example.com",
        subject: "Senior Fullstack Role",
        message: "I am interested in opportunities in LATAM.",
      }),
    },
    async (res) => {
      assert.equal(res.status, 200, "Valid submission should return 200");
      const json = await res.json();
      assert.equal(json.success, true, "Should return success: true");
    }
  );

  const emptyApplyForm = new FormData();
  emptyApplyForm.append("name", "");
  emptyApplyForm.append("email", "");

  await testApi(
    "Apply Validation on Empty Form",
    "/api/apply",
    {
      method: "POST",
      body: emptyApplyForm,
    },
    async (res) => {
      assert.equal(res.status, 400, "Empty apply form should return 400");
      const json = await res.json();
      assert.ok(json.errors?.name, "Should complain about missing name");
    }
  );

  console.log("\n========================================================");
  console.log("🎉 ALL 18 END-TO-END VERIFICATION CHECKS PASSED!");
  console.log("========================================================\n");
}

async function main() {
  try {
    await runTests();
  } catch (err) {
    console.error("\n❌ E2E Verification failed:", err.message);
    process.exitCode = 1;
  } finally {
    if (serverProcess && serverProcess.pid) {
      console.log("Stopping test server...");
      try {
        process.kill(-serverProcess.pid, "SIGTERM");
      } catch {
        serverProcess.kill("SIGTERM");
      }
    }
  }
}

main();
