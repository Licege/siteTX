'use strict'

module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.bulkInsert('GlobalSettings', [
      {
        isDeliveryWorking: true,
        phone: '+7',
        paymentCash: true,
        paymentCashless: false,
        paymentOnline: false,
        saleForPickup: 0
      }
    ])
  },

  down: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.bulkDelete('GlobalSettings', null, {})
  }
}
