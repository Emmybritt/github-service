"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("repositories", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      language: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      forksCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      starsCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      openIssuesCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      watchersCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("repositories");
  },
};
