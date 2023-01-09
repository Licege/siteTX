module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Vacancies', 'shortDescription', {
      type: Sequelize.TEXT,
      defaultValue: ''
    })

    await queryInterface.removeColumn('Vacancies', 'requirements')

    return queryInterface
  },

  down: async (queryInterface) => {
    await queryInterface.addColumn('Vacancies', 'requirements', {
      type: Sequelize.TEXT,
      defaultValue: ''
    })

    await queryInterface.removeColumn('Vacancies', 'shortDescription')

    return queryInterface
  }
}
