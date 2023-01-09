module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    positionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'StaffPositions',
        key: 'id'
      }
    },
    avatarSrc: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    middleName: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    dateOfEmployment: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    dateOfDismissal: {
      type: DataTypes.DATE
    },
    telegramId: {
      type: DataTypes.INTEGER
    }
  })

  Employee.associate = (models) => {
    Employee.belongsTo(models.StaffPosition, {
      foreignKey: 'positionId',
      as: 'position'
    })
  }

  return Employee
}
