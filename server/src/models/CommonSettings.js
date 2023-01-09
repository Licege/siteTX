module.exports = (sequelize, DataTypes) => {
  const Settings = sequelize.define('CommonSettings', {
    cityId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      references: {
        key: 'id',
        model: 'User'
      }
    },
    priceForDelivery: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    freeDelivery: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isDelivery: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  })

  Settings.associate = (models) => {
    Settings.belongsTo(models.City, {
      foreignKey: 'cityId',
      as: 'city',
      onDelete: 'CASCADE'
    })
  }

  return Settings
}
