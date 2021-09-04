module.exports = {
  up: async (queryInterface, Sequelize) =>
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

  down: async queryInterface => queryInterface.dropTable('StaffPositions')
};
