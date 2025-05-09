module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.createTable('ComplainTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmpty: false
        },
        unique: true
      }
    })
  },
  down: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.dropTable('ComplainTypes')
  }
}
