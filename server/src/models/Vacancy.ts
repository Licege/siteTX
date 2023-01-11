// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = (sequelize: any, DataTypes: any) => {
  const Vacancy = sequelize.define('Vacancy', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    shortDescription: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    description: DataTypes.TEXT,
    salaryFrom: DataTypes.INTEGER,
    salaryTo: DataTypes.INTEGER,
    imageSrc: DataTypes.STRING
  })

  return Vacancy
}
