"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Categories", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        code: {
            type: Sequelize.STRING,
        },
        value: {
            type: Sequelize.STRING,
        },

        createdAt: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.fn("now"),
        },
        updatedAt: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.fn("now"),
        },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Categories");
    },
};
