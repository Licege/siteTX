module.exports = {
  up: async (queryInterface: any, Sequelize: any) =>
    queryInterface.createTable('Gallery', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      files: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        defaultValue: []
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),

  down: async (queryInterface: any) => queryInterface.dropTable('Gallery')
}
