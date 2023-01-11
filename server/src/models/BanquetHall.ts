// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = (sequelize: any, DataTypes: any) => {
  const BanquetHall = sequelize.define(
    'BanquetHall',
    {
      phone: DataTypes.STRING,
      capacity: {
        type: DataTypes.INTEGER
      },
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      images: DataTypes.ARRAY(DataTypes.STRING),
      restaurantId: DataTypes.INTEGER
    },
    { timestamps: false }
  )

  BanquetHall.associate = (models: any) => {
    BanquetHall.hasOne(models.Restaurant, {
      foreignKey: 'restaurantId',
      targetKey: 'id'
    })
  }

  return BanquetHall
}
