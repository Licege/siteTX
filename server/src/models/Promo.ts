// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = (sequelize: any, DataTypes: any) => {
  const Promo = sequelize.define('Promo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    shortDescription: DataTypes.TEXT,
    description: DataTypes.TEXT,
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    show: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    imageSrc: DataTypes.STRING
  })

  return Promo
}
