import apicache from "apicache-plus";
import redisClientWrapper from "../common/redis/redisClientWrapper.js";

// Create a cache middleware using redis and cache only if success (status 200)
// useful for scoping cache with userExternalCode
// ttl in plain-english durations
class RediscCacheMiddlewareWithUserExternalCode {
  constructor() {
    this.options = {
      debug: true,
      redisClient: redisClientWrapper(),
      append: (req, res) => req.user.userExternalCode,
      legacyMode: true,
    };
    apicache.options(this.options);
  }

  #toggleMiddleware() {
    return (req, res) => req.user && req.user.userExternalCode && res.statusCode === 200;
  }

  getMiddleware(ttl = process.env.API_CACHE_TTL) {
    return apicache(ttl, this.#toggleMiddleware());
  }
}

export default new RediscCacheMiddlewareWithUserExternalCode();
