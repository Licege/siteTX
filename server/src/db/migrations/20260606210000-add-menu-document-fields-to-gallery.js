'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Gallery', 'pdfSrc', {
      type: Sequelize.STRING,
      allowNull: true
    })
    await queryInterface.addColumn('Gallery', 'previewSrc', {
      type: Sequelize.STRING,
      allowNull: true
    })
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Gallery', 'previewSrc')
    await queryInterface.removeColumn('Gallery', 'pdfSrc')
  }
}
