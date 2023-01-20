'use strict'
module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.createTable('CommonSettings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      city: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmpty: false
        }
      },
      priceForDelivery: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      freeDelivery: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      isDelivery: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.dropTable('CommonSettings')
  }
}
