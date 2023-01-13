module.exports = (sequelize: any, DataTypes: any) => {
  const StaffPosition = sequelize.define(
    'StaffPosition',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      tips: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    { timestamps: false }
  )

  StaffPosition.associate = (models: any) => {
    StaffPosition.hasMany(models.Employee, { foreignKey: 'positionId' })
  }

  return StaffPosition
}
