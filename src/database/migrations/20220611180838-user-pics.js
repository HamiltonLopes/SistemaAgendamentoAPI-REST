'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Users', //Table Name
      'pic_id', //Colunm Name
      {
        type: Sequelize.INTEGER,
        references: {model: 'Files', key: 'id'}, //Table name and reference key name
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      }
    );

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users', 'Files');
  }
};
