import Sequelize from "sequelize";
import User from "../api/v1/auth/user/user.model.js";
import config from "../config/config.js";
import l from "./logger.js";

let sequelize;

l.debug("setup LOCAL POSTGRES connection");
sequelize = new Sequelize(process.env.AUTH_SERVICE_DB_CONNECTION_URL, config["development"]);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User(sequelize, Sequelize);

db.User.associate(db);

export default db;
