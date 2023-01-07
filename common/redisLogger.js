import fs from "fs";
import pino from "pino";
import pretty from "pino-pretty";

const logLevel = process.env.DEBUG ? "trace" : "info";
const logFilename = `redis_${process.env.APP_ID}.log`;
const config = {
  base: undefined,
  name: `redis-${process.env.APP_ID}`,
  timestamp: pino.stdTimeFunctions.isoTime,
  level: logLevel,
  options: {
    colorize: true,
  },
};

const streams = [
  { level: logLevel, stream: pretty({ colorize: true }) },
  { level: logLevel, stream: pino.destination(`/tmp/logs/${logFilename}`) },
];

const l = pino(config, pino.multistream(streams));

export default l;
