module.exports = (sequelize, DataTypes) => {
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
