'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Books", {
            id: {
                allowNull: false,
                
                primaryKey: true,
                type: Sequelize.STRING,
            },
            title: {
                type: Sequelize.STRING,
            },
            price: {
                type: Sequelize.FLOAT,
                defaultValue: 0,
            },
            available: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            image: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.TEXT,
                
            },
            category_code: {
                type: Sequelize.STRING,
            },
            filename: {
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
        await queryInterface.dropTable('Books');
    }
};