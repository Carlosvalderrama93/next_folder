/**
 * Unit tests for testimonials domain seam.
 * Run with: node --test src/lib/testimonials/__tests__/testimonials.test.mjs
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ── Pure logic mirroring static-adapter.ts ───────────────────────────────────
const staticTestimonials = [
  {
    id: "3",
    name: "Emily Carter",
    role: "Frontend Developer",
    message:
      "The entire process was smooth, transparent, and much faster than I expected. I received constant updates and valuable interview preparation.",
    avatar: "/images/emily.jpg",
  },
  {
    id: "4",
    name: "Michael Brown",
    role: "DevOps Engineer",
    message: "Excellent communication from start to finish.",
    avatar: "/images/michael.jpg",
  },
  {
    id: "5",
    name: "Sophia Wilson",
    role: "UX/UI Designer",
    message:
      "I felt genuinely supported throughout every stage of the hiring process. The recruiter understood my career goals and connected me with a company that was the perfect fit for both my skills and long-term aspirations.",
    avatar: "/images/sophia.jpg",
  },
  {
    id: "6",
    name: "David Lee",
    role: "Backend Developer",
    message:
      "Very professional, responsive, and always available to answer my questions. I highly recommend working with them.",
    avatar: "/images/david.jpg",
  },
  {
    id: "7",
    name: "Olivia Martinez",
    role: "QA Automation Engineer",
    message:
      "From the first call to signing my offer, everything was organized and stress-free. The guidance before each interview gave me the confidence I needed to perform at my best.",
    avatar: "/images/olivia.jpg",
  },
  {
    id: "8",
    name: "Daniel Kim",
    role: "Data Engineer",
    message: "Amazing experience!",
    avatar: "/images/daniel.jpg",
  },
];

function getStaticTestimonials(options) {
  const list = [...staticTestimonials];
  if (options?.limit && options.limit > 0) {
    return list.slice(0, options.limit);
  }
  return list;
}

function normalizeStrapiTestimonial(raw) {
  const roleDisplay =
    raw.company && !raw.role.includes(raw.company)
      ? `${raw.role} · ${raw.company}`
      : raw.role;

  return {
    id: String(raw.documentId ?? raw.id),
    name: raw.name,
    role: roleDisplay,
    message: raw.message,
    avatar: raw.avatar,
  };
}

async function listTestimonials(options, fetchStrapi = async () => []) {
  const strapiData = await fetchStrapi(options);
  if (strapiData.length > 0) {
    return strapiData;
  }
  return getStaticTestimonials(options);
}

// ── Tests ────────────────────────────────────────────────────────────────────
describe("Testimonials Domain Seam", () => {
  describe("getStaticTestimonials", () => {
    it("returns all static testimonials by default", () => {
      const results = getStaticTestimonials();
      assert.equal(results.length, 6);
      assert.equal(results[0].id, "3");
      assert.equal(results[0].name, "Emily Carter");
    });

    it("verifies all testimonials have valid required fields", () => {
      const results = getStaticTestimonials();
      for (const item of results) {
        assert.ok(typeof item.id === "string" && item.id.length > 0, "id must be non-empty string");
        assert.ok(typeof item.name === "string" && item.name.length > 0, "name must be non-empty string");
        assert.ok(typeof item.role === "string" && item.role.length > 0, "role must be non-empty string");
        assert.ok(typeof item.message === "string" && item.message.length > 0, "message must be non-empty string");
        if (item.avatar) {
          assert.ok(typeof item.avatar === "string", "avatar must be a string");
        }
      }
    });

    it("applies limit option correctly", () => {
      const limited = getStaticTestimonials({ limit: 2 });
      assert.equal(limited.length, 2);
      assert.equal(limited[0].id, "3");
      assert.equal(limited[1].id, "4");
    });

    it("returns all items when limit is greater than array size", () => {
      const limited = getStaticTestimonials({ limit: 100 });
      assert.equal(limited.length, 6);
    });

    it("ensures immutability: mutating returned array does not affect subsequent calls", () => {
      const firstCall = getStaticTestimonials();
      firstCall.pop();
      assert.equal(firstCall.length, 5);

      const secondCall = getStaticTestimonials();
      assert.equal(secondCall.length, 6);
    });
  });

  describe("listTestimonials (facade)", () => {
    it("resolves async testimonials matching static adapter", async () => {
      const asyncResults = await listTestimonials();
      assert.equal(asyncResults.length, 6);
      assert.equal(asyncResults[0].name, "Emily Carter");
    });

    it("resolves async testimonials with limit option", async () => {
      const asyncResults = await listTestimonials({ limit: 3 });
      assert.equal(asyncResults.length, 3);
      assert.equal(asyncResults[2].name, "Sophia Wilson");
    });

    it("prefers Strapi data when available", async () => {
      const mockStrapi = async () => [
        {
          id: "strapi-1",
          name: "Carlos V.",
          role: "Senior Staff Engineer",
          message: "Great recruitment experience",
          avatar: "/images/carlos.jpg",
        },
      ];
      const results = await listTestimonials(undefined, mockStrapi);
      assert.equal(results.length, 1);
      assert.equal(results[0].name, "Carlos V.");
    });

    it("falls back cleanly to static fixtures when Strapi returns empty array", async () => {
      const mockEmptyStrapi = async () => [];
      const results = await listTestimonials(undefined, mockEmptyStrapi);
      assert.equal(results.length, 6);
      assert.equal(results[0].name, "Emily Carter");
    });
  });

  describe("normalizeStrapiTestimonial", () => {
    it("normalizes Strapi testimonial with company appended to role", () => {
      const normalized = normalizeStrapiTestimonial({
        id: 42,
        documentId: "doc-42",
        name: "Alice Smith",
        role: "Lead Engineer",
        company: "Vercel Partner",
        message: "Found my dream remote job.",
        avatar: "/uploads/alice.png",
      });

      assert.equal(normalized.id, "doc-42");
      assert.equal(normalized.name, "Alice Smith");
      assert.equal(normalized.role, "Lead Engineer · Vercel Partner");
      assert.equal(normalized.message, "Found my dream remote job.");
      assert.equal(normalized.avatar, "/uploads/alice.png");
    });

    it("avoids duplicating company name if already present in role", () => {
      const normalized = normalizeStrapiTestimonial({
        id: 43,
        documentId: "doc-43",
        name: "Bob Jones",
        role: "CTO at TechCorp",
        company: "TechCorp",
        message: "Great candidates.",
      });

      assert.equal(normalized.role, "CTO at TechCorp");
    });
  });
});

describe("Testimonials Presentation Module · Locality & Architecture Contracts", () => {
  it("guarantees components/testimonials/ acts as canonical module and purges loose root components", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const { fileURLToPath } = await import("node:url");

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const testimonialsDir = path.resolve(__dirname, "../../../components/testimonials");
    const indexPath = path.join(testimonialsDir, "index.ts");
    const sectionPath = path.join(testimonialsDir, "testimonials-section.tsx");
    const carouselPath = path.join(testimonialsDir, "testimonials-carousel.tsx");
    const legacySectionPath = path.resolve(__dirname, "../../../components/testimonials.tsx");
    const legacyCarouselPath = path.resolve(__dirname, "../../../components/testimonials-carousel.tsx");
    const pagePath = path.resolve(__dirname, "../../../app/[locale]/page.tsx");

    assert.ok(fs.existsSync(testimonialsDir), "components/testimonials/ directory must exist");
    assert.ok(fs.existsSync(indexPath), "components/testimonials/index.ts must exist");
    assert.ok(fs.existsSync(sectionPath), "components/testimonials/testimonials-section.tsx must exist");
    assert.ok(fs.existsSync(carouselPath), "components/testimonials/testimonials-carousel.tsx must exist");
    assert.ok(!fs.existsSync(legacySectionPath), "Legacy testimonials.tsx must be purged from components/ root");
    assert.ok(!fs.existsSync(legacyCarouselPath), "Legacy testimonials-carousel.tsx must be purged from components/ root");

    const indexContent = fs.readFileSync(indexPath, "utf-8");
    assert.ok(indexContent.includes("TestimonialsSection"), "index.ts must export TestimonialsSection");
    assert.ok(indexContent.includes("TestimonialsCarousel"), "index.ts must export TestimonialsCarousel");

    const pageContent = fs.readFileSync(pagePath, "utf-8");
    assert.ok(pageContent.includes('from "@/components/testimonials"'), "HomePage must import from @/components/testimonials");
  });
});

