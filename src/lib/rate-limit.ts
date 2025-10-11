import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Rate limiters for different endpoints
export const contactFormLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "1 h"), // 3 requests per hour
  analytics: true,
  prefix: "@upstash/ratelimit/contact",
});

export const newsletterLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, "1 h"), // 2 requests per hour
  analytics: true,
  prefix: "@upstash/ratelimit/newsletter",
});

export const voteLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 h"), // 10 votes per hour
  analytics: true,
  prefix: "@upstash/ratelimit/vote",
});

export const demoRequestLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, "1 h"), // 2 requests per hour
  analytics: true,
  prefix: "@upstash/ratelimit/demo",
});

// Helper function to get identifier (IP address) from request
export function getIdentifier(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() :
             request.headers.get("x-real-ip") ||
             "unknown";
  return ip;
}
