// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = (sequelize: any, DataTypes: any) => {
  const Restaurant = sequelize.define('Restaurant', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    about: DataTypes.TEXT,
    addressId: DataTypes.INTEGER
  })

  Restaurant.associate = (models: any) => {
    Restaurant.hasOne(models.Address, {
      foreignKey: 'addressId',
      targetKey: 'id'
    })
    Restaurant.belongsTo(models.BanquetHall, {
      foreignKey: 'id',
      targetKey: 'restaurantId'
    })
  }

  return Restaurant
}
