"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("User", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      email: { type: Sequelize.STRING, allowNull: false },
      password: { type: Sequelize.STRING, allowNull: true },
      passwordResetToken: { type: Sequelize.STRING, allowNull: true },
      passwordResetTokenExpiresAt: { type: Sequelize.DATE, allowNull: true },
      activationToken: { type: Sequelize.STRING, allowNull: true },
      activationTokenExpiresAt: { type: Sequelize.DATE, allowNull: true },
      temporaryEmail: { type: Sequelize.STRING, allowNull: true },
      temporaryEmailToken: { type: Sequelize.STRING, allowNull: true },
      temporaryEmailTokenExpiresAt: { type: Sequelize.DATE, allowNull: true },
      userExternalCode: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("User");
  },
};
