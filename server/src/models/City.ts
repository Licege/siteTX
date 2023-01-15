module.exports = (sequelize: any, DataTypes: any) => {
  const City = sequelize.define(
    'City',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    { timestamps: false }
  )

  return City
}