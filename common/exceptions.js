import l from "./logger.js";

const notifyException = async (req, error) => {
  const correlationId = req.correlationId();
  l.error(error, `Exception --> ${correlationId}`);
  if (process.env.APP_ENV !== "development") {
    // await airbrakeClient.notify(error)
  }
};

const handleException = (req, res, error) => {
  notifyException(req, error);
  return res.set(error.headers).status(500).json({ message: error.message });
};

const wrap =
  (fn) =>
  (...args) =>
    fn(...args).catch((e) => {
      handleException(args[0], args[1], e);
    });
export { handleException, notifyException, wrap };
