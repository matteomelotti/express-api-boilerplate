import apicache from "apicache-plus";
import redisClientWrapper from "../common/redis/redisClientWrapper.js";

// Create a cache middleware using redis and cache only if success (status 200)
// useful for generic caching without userExternalCode
// ttl in plain-english durations
class RediscCacheMiddleware {
  constructor() {
    this.options = {
      debug: true,
      redisClient: redisClientWrapper(),
      legacyMode: true,
    };
    apicache.options(this.options);
  }

  #toggleMiddleware() {
    return (_, res) => res.statusCode === 200;
  }

  getMiddleware(ttl = process.env.API_CACHE_TTL) {
    return apicache(ttl, this.#toggleMiddleware());
  }
}

export default new RediscCacheMiddleware();
