// rateLimitMiddleware.js
import { ratelimit } from "../config/uptash.js";

export const rateLimitMiddleware = async (req, res, next) => {
  const identifier = req.ip; // limit per IP (can change to userId if needed)
  const { success, limit, remaining, reset } = await ratelimit.limit(identifier);

  // Add helpful headers
  res.setHeader("X-RateLimit-Limit", limit);
  res.setHeader("X-RateLimit-Remaining", remaining);
  res.setHeader("X-RateLimit-Reset", reset);

  if (!success) {
    return res.status(429).json({
      error: "Too many requests. Please try again later.",
    });
  }

  next();
};
