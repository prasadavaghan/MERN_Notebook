//this file is used to limit the number of requests a user can make to the server in a given time period. 
// This is useful for preventing abuse and ensuring fair usage of the server's resources.
import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const clientIp = (req.headers["x-forwarded-for"] || req.ip || "unknown")
      .toString()
      .split(",")[0]
      .trim();
    const key = `ratelimit:${clientIp}:${req.method}:${req.baseUrl || req.path}`;

    const { success } = await ratelimit.limit(key);
    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later." });
    }
    next();
  } catch (err) {
    console.error("Rate Limit error", err);
    next(err);
  }
};
export default rateLimiter;
