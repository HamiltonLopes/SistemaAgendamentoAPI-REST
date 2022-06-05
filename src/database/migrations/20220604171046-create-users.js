'use strict';


module.exports =  {
    async up (queryInterface, Sequelize) {
      return queryInterface.createTable('Users', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password_hash: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        provider:{
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        }
      });
    },

    async down (queryInterface) {
      return queryInterface.dropTable('Users');
    }
};
