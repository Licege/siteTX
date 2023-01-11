// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = (sequelize: any, DataTypes: any) => {
  return sequelize.define('Gallery', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    files: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: []
    }
  })
}
