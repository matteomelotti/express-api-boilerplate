import Redis from "ioredis";

export default () => {
  const connectionUrlWithDB = process.env.AUTH_SERVICE_REDIS_URL.replace(/\/0/, `/${process.env.REDIS_DB}`);
  return new Redis(connectionUrlWithDB);
};
