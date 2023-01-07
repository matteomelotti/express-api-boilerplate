import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../../../common/localDatabase.js";

class AuthService {
  getModel() {
    return db.User;
  }

  async getUserFromToken(token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await db.User.findOne({ where: { userExternalCode: decodedToken.id } });
      return user;
    } catch (e) {
      console.log(e);
    }

    return null;
  }

  async find(id) {
    return this.getModel().findByPk(id);
  }

  async findByUserExternalCode(id) {
    return this.getModel().findOne({ where: { userExternalCode: id } });
  }

  generateTokenForUser(user) {
    try {
      console.log(user);
      const token = jwt.sign({ userExternalCode: user.userExternalCode, email: user.email }, process.env.JWT_SECRET);
      return token;
    } catch (e) {
      console.log(e);
    }

    return null;
  }

  async register(data) {
    try {
      if (!data.password || !data.email) return null;
      const salt = await bcrypt.genSaltSync(10);
      const passwordHash = await bcrypt.hash(data.password, salt);
      const newUser = await db.User.create({ email: data.email, password: passwordHash });
      await newUser.save();
      return newUser;
    } catch (e) {
      console.log(e);
    }

    return null;
  }

  async deleteByUserExternalCode(userExternalCode) {
    return this.getModel().destroy({
      where: {
        userExternalCode: userExternalCode,
      },
    });
  }
}

export default new AuthService();
