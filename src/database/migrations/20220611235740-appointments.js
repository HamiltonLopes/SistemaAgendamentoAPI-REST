'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('Appointments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {model: 'Users', key: 'id'}, //Table name and reference key name
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      collaborator_id: {
        type: Sequelize.INTEGER,
        references: {model: 'Users', key: 'id'}, //Table name and reference key name
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      canceledAt: {
        type: Sequelize.DATE,
        defaultValue: null
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

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Appointments');
  }
};
