'use strict'
module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      street: {
        type: Sequelize.STRING
      },
      house: {
        type: Sequelize.STRING
      },
      flat: {
        type: Sequelize.STRING
      },
      floor: {
        type: Sequelize.STRING
      },
      intercom: {
        type: Sequelize.STRING
      }
    })
  },
  down: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.dropTable('Addresses')
  }
}
