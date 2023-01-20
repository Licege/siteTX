module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.addColumn('Employees', 'telegramId', {
      type: Sequelize.INTEGER
    })
  },

  down: async (queryInterface: any) => {
    await queryInterface.removeColumn('Employees', 'telegramId')
  }
}
