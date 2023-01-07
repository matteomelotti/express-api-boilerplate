import _ from "lodash";
import authService from "./auth.service.js";
import authValidator from "./auth.validator.js";

class AuthController {
  async me(req, res) {
    return res.status(200).json({
      success: true,
      email: req.user.email,
    });
  }

  async login(req, res) {
    const errors = await authValidator.onLogin(req.body);

    if (errors) {
      return res.status(422).json({
        success: false,
        errors: errors.details,
      });
    }

    return res.json({
      token: authService.generateTokenForUser(req.user),
    });
  }

  async register(req, res) {
    const errors = await authValidator.onRegister(req.body);

    if (errors) {
      return res.status(422).json({
        success: false,
        errors: errors.details,
      });
    }
    const userData = _.pick(req.body, ["email", "password"]);
    const result = await authService.register(userData);
    if (result) {
      return res.json(result);
    } else {
      return res.status(422).json({
        success: false,
        message: "Failed to register new user.",
      });
    }
  }

  async delete(req, res) {
    const user = await authService.findByUserExternalCode(req.user.userExternalCode);
    if (!user)
      return res.status(404).json({
        success: false,
        errors: "User not found.",
      });

    const result = await authService.deleteByUserExternalCode(req.user.userExternalCode);
    if (result) {
      return res.status(200).json({});
    }
    return res.status(422).json({
      success: false,
      errors: "User not deleted",
    });
  }
}

export default new AuthController();
