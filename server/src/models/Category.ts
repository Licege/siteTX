// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = (sequelize: any, DataTypes: any) => {
  const Category = sequelize.define('Category', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    titleEn: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isDelivery: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    deletedAt: DataTypes.DATE
  })

  Category.associate = (models: any) => {
    Category.hasMany(models.Dish, {
      onDelete: 'CASCADE',
      foreignKey: 'categoryId'
    })
  }

  return Category
}
