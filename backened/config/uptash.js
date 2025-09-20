// rateLimit.js
// rateLimit.js
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// ⚠️ Replace with your actual Upstash credentials
const redis = new Redis({
  url: "https://grateful-mouse-6699.upstash.io",   // paste your URL here
  token: "ARorAAImcDJmZWZhMTVjMjM0MGU0ODgxOWNhODAwNmMzYjcxZDcwNnAyNjY5OQ"                   // paste your token here
});

// Create a rate limiter: 10 requests per 20 seconds
export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, "60s"),
  analytics: true,
});
