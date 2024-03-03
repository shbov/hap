'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // add foreign key to events table
    await queryInterface.addColumn('events', 'chosen_interval', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'intervals',
        key: 'id'
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('events', 'chosen_interval')
  }
}
