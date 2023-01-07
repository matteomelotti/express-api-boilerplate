import Joi from "joi";
import db from "../../../common/localDatabase.js";

class AuthValidator {
  async onLogin(obj) {
    const schemaKeys = {
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    };
    const schema = Joi.object().keys(schemaKeys);
    const { error } = schema.validate(obj, { abortEarly: false });
    return error;
  }

  async onRegister(obj) {
    const schemaKeys = {
      email: Joi.string()
        .required()
        .email()
        .external(async (email) => {
          console.log(`email is: ${email}`);
          const user = await db.User.findOne({ where: { email } });
          console.log(user);
          if (user) throw new Error("email already exists in our records");
        }),
      password: Joi.string().required(),
    };
    const schema = Joi.object().keys(schemaKeys);
    const { error } = await schema.validateAsync(obj, { abortEarly: false });
    return error;
  }
}

export default new AuthValidator();
