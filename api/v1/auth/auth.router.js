import * as express from "express";
import passport from "passport";
import { wrap } from "../../../common/exceptions.js";
import checkJwt from "../../../middlewares/jwt.middleware.js";
import authController from "./auth.controller.js";

export default express
  .Router()
  .post("/login", passport.authenticate("login", { session: false, failureRedirect: "/" }), wrap(authController.login))
  .post("/register", wrap(authController.register))
  .get("/me", checkJwt, wrap(authController.me))
  .delete("/user/delete-me", checkJwt, wrap(authController.delete));
