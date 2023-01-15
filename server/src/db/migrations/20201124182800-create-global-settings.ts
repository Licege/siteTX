'use strict'
module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.createTable('GlobalSettings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isDeliveryWorking: {
        type: Sequelize.BOOLEAN
      },
      phone: {
        type: Sequelize.STRING
      },
      paymentCash: {
        type: Sequelize.BOOLEAN
      },
      paymentCashless: {
        type: Sequelize.BOOLEAN
      },
      paymentOnline: {
        type: Sequelize.BOOLEAN
      },
      saleForPickup: {
        type: Sequelize.INTEGER
      }
    })
  },
  down: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.dropTable('GlobalSettings')
  }
}
