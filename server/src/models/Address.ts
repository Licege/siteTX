// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = (sequelize: any, DataTypes: any) => {
  const Address = sequelize.define(
    'Address',
    {
      city: DataTypes.STRING,
      street: DataTypes.STRING,
      house: DataTypes.STRING,
      flat: DataTypes.STRING,
      floor: DataTypes.STRING,
      intercom: DataTypes.STRING
    },
    { timestamps: false }
  )

  Address.associate = (models: any) => {
    Address.belongsTo(models.User, { foreignKey: 'id', targetKey: 'addressId' })
    Address.belongsTo(models.Restaurant, {
      foreignKey: 'id',
      targetKey: 'addressId'
    })
  }

  return Address
}
