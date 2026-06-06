module.exports = (sequelize, DataTypes) => {
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
    },
    pdfSrc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    previewSrc: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Gallery'
  })
}
