export interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfter: number;
  remaining?: number;
  source?: "kv" | "memory";
}

const memoryStore = new Map<string, RateLimitEntry>();

/**
 * Resets in-memory storage (useful for deterministic tests).
 */
export function _resetMemoryStore(): void {
  memoryStore.clear();
}

/**
 * Resolves client IP from standard proxy, CDN, and direct headers.
 */
export function getIp(req: Request): string {
  return (
    req.headers.get("cf-connecting-ip")?.trim() ??
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip")?.trim() ??
    "unknown"
  );
}

/**
 * In-memory sliding window rate limiter fallback.
 */
function memoryRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const entry = memoryStore.get(key);

  if (!entry || now > entry.resetAt) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0, remaining: maxRequests - 1, source: "memory" };
  }

  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
      remaining: 0,
      source: "memory",
    };
  }

  entry.count++;
  return {
    allowed: true,
    retryAfter: 0,
    remaining: Math.max(0, maxRequests - entry.count),
    source: "memory",
  };
}

/**
 * Optional Upstash / Vercel KV REST pipeline execution.
 */
async function kvRateLimit(
  key: string,
  maxRequests: number,
  windowSeconds: number,
  kvUrl: string,
  kvToken: string
): Promise<RateLimitResult> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 1500);

  try {
    const prefixedKey = `ratelimit:${key}`;
    const pipelineUrl = `${kvUrl.replace(/\/$/, "")}/pipeline`;

    const response = await fetch(pipelineUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${kvToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", prefixedKey],
        ["EXPIRE", prefixedKey, windowSeconds, "NX"],
        ["TTL", prefixedKey],
      ]),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`KV response status ${response.status}`);
    }

    const json = (await response.json()) as Array<{ result?: number; error?: string }>;
    const count = json[0]?.result ?? 1;
    const ttl = json[2]?.result ?? windowSeconds;

    if (count > maxRequests) {
      return {
        allowed: false,
        retryAfter: Math.max(1, ttl),
        remaining: 0,
        source: "kv",
      };
    }

    return {
      allowed: true,
      retryAfter: 0,
      remaining: Math.max(0, maxRequests - count),
      source: "kv",
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Universal rate limiter supporting Upstash/Vercel KV REST with automatic in-memory fallback.
 * Zero external packages required; uses native fetch with 1.5s abort timeout.
 */
export async function rateLimit(
  ip: string,
  maxRequests = 5,
  windowMs = 60_000
): Promise<RateLimitResult> {
  const kvUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const kvToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (kvUrl && kvToken) {
    try {
      const windowSeconds = Math.ceil(windowMs / 1000);
      return await kvRateLimit(ip, maxRequests, windowSeconds, kvUrl, kvToken);
    } catch (err) {
      console.warn("[rate-limit] KV unavailable, falling back to in-memory store:", err);
    }
  }

  return memoryRateLimit(ip, maxRequests, windowMs);
}
