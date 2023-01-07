import compression from "compression";
import cors from "cors";
import express from "express";
import correlator from "express-correlation-id";
import _ from "lodash";
import * as os from "os";
import passport from "passport";
import swaggerUi from "swagger-ui-express";
import "./common/env.js";
import { handleException } from "./common/exceptions.js";
import l from "./common/logger.js";
import swaggerDocument from "./docs/swagger.json" assert { type: "json" };

import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import db from './common/localDatabase.js';

const app = express();

export default class ExpressServer {
  constructor() {
    l.debug(process.env.NODE_ENV);
    if (process.env.NODE_ENV == "development")
      app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.options("*", cors());
    app.use(compression());
    app.use(passport.initialize());
    passport.use(
      "login",
      new LocalStrategy({ usernameField: "email", passwordField: "password" }, async (email, password, done) => {
        if (email && password) {
          const user = await db.User.findOne({ where: { email: email }, raw: true });
          if (!user) return done(null, false);
    
          const passwordIsValid = await bcrypt.compare(password, user.password);
          if (!passwordIsValid) return done(null, false);
    
          return done(null, user);
        }
    
        return done(null, false);
      })
    );
    
    app.use(correlator()); // last middleware
    if (process.env.NODE_ENV !== "production") {
      app.use((req, res, next) => {
        // l.debug(req)
        const correlationId = req.correlationId();
        l.debug(
          {
            ..._.pick(req, ["method", "url", "params", "query", "body"]),
            headers: _.pick(req.headers, ["authorization", "x-time-now"]),
          },
          `Request -> ${correlationId}`
        );
        res.on("finish", function () {
          l.debug(
            {
              statusCode: res.statusCode,
            },
            `Response -> ${correlationId}`
          );
        });
        next();
      });
    }
    app.use((err, req, res, next) => {
      handleException(req, res, err);
    });
  }

  router(routes) {
    routes(app);
    return this;
  }

  listen(port = 3000) {
    l.debug(`UP AND RUNNING IN ${process.env.NODE_ENV || "development"} @: ${os.hostname()} on port: ${port}}`);
    app.listen(port);
    return this;
  }
}
