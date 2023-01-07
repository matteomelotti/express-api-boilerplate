// APP ROUTES

import authRouter from "./api/v1/auth/auth.router.js";

export default function routes(app) {
  app.use("/api/v1/auth", authRouter);
}
