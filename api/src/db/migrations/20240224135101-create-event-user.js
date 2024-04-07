'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('event_user', {
      event_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'events',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('event_users')
  }
}
