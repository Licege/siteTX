module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.addColumn('GlobalSettings', 'pdfMenuSrc', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    })

    await queryInterface.addColumn('GlobalSettings', 'showMenuType', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'card'
    })

    return queryInterface
  },

  down: async (queryInterface: any) => {
    await queryInterface.removeColumn('GlobalSettings', 'pdfMenuSrc')
    await queryInterface.removeColumn('GlobalSettings', 'showMenuType')

    return queryInterface
  }
}
