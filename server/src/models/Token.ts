module.exports = (sequelize: any, DataTypes: any) => {
  const Token = sequelize.define('Token', {
    tokenId: DataTypes.STRING,
    role: DataTypes.STRING
  })

  Token.associate = (models: any) => {
    Token.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' })
  }

  return Token
}
