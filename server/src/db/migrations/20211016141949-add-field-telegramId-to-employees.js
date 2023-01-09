module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Employees', 'telegramId', {
      type: Sequelize.INTEGER
    })
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Employees', 'telegramId')
  }
}
