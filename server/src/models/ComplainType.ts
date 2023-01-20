module.exports = (sequelize: any, DateTypes: any) => {
  const ComplainType = sequelize.define(
    'ComplainType',
    {
      title: {
        type: DateTypes.STRING,
        allowNull: false,
        validate: {
          isEmpty: false
        },
        unique: true
      }
    },
    { timestamps: false }
  )

  ComplainType.associate = (models: any) => {
    ComplainType.hasMany(models.Complain, {
      onDelete: 'CASCADE',
      foreignKey: 'typeId'
    })
  }

  return ComplainType
}
