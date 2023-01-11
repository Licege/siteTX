// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = (sequelize: any, DataTypes: any) => {
  return sequelize.define('Session', {
    sid: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    userId: DataTypes.INTEGER,
    data: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    expires: DataTypes.DATE
  })
}
