"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: true },
      passwordResetToken: { type: DataTypes.STRING, allowNull: true },
      passwordResetTokenExpiresAt: { type: DataTypes.DATE, allowNull: true },
      activationToken: { type: DataTypes.STRING, allowNull: true },
      activationTokenExpiresAt: { type: DataTypes.DATE, allowNull: true },
      temporaryEmail: { type: DataTypes.STRING, allowNull: true },
      temporaryEmailToken: { type: DataTypes.STRING, allowNull: true },
      temporaryEmailTokenExpiresAt: { type: DataTypes.DATE, allowNull: true },
      userExternalCode: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "User",
    }
  );

  return User;
};
