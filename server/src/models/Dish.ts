module.exports = (sequelize: any, DataTypes: any) => {
  const Dish = sequelize.define('Dish', {
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    weight: {
      type: DataTypes.NUMBER,
      defaultValue: 0
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isDelivery: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    imageSrc: DataTypes.STRING
  })

  Dish.associate = (models: any) => {
    Dish.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      targetKey: 'id'
    })
  }

  return Dish
}
