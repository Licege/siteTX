module.exports = {
  up: async (queryInterface: any, Sequelize: any) =>
    queryInterface.createTable('StaffPositions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      tips: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }),

  down: async (queryInterface: any) => queryInterface.dropTable('StaffPositions')
}
