module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      positionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'StaffPositions',
          key: 'id'
        }
      },
      avatarSrc: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      middleName: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      dateOfEmployment: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      dateOfDismissal: {
        type: Sequelize.DATE
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

  down: async queryInterface => queryInterface.dropTable('Employees')
};
