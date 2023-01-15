const { CommonSettings, City } = require('../../models').init()

module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.renameColumn('CommonSettings', 'city', 'cityId', {
        transaction
      })

      const [citiesResults] = await queryInterface.sequelize.query(
        'SELECT "cityId" FROM "CommonSettings"',
        { transaction }
      )

      const newCityRecords = citiesResults.map(({
        cityId
      }: any) => ({
        name: cityId
      }))

      await City.bulkCreate(newCityRecords, { transaction, returning: true })

      await queryInterface.sequelize.query('DELETE FROM "CommonSettings"', {
        transaction
      })

      await queryInterface.changeColumn(
        'CommonSettings',
        'cityId',
        {
          type: 'INTEGER USING CAST("cityId" as INTEGER)'
        },
        { transaction }
      )

      await queryInterface.changeColumn(
        'CommonSettings',
        'cityId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Cities',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        { transaction }
      )

      await transaction.commit()
    } catch (error) {
      console.log(error)
      await transaction.rollback()
    }
  },
  down: async (queryInterface: any) => {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      const [cities] = await queryInterface.sequelize.query(
        'SELECT * FROM "Cities"',
        { transaction }
      )

      await queryInterface.changeColumn(
        'CommonSettings',
        'cityId',
        {
          type: 'VARCHAR USING CAST("cityId" as VARCHAR)'
        },
        { transaction }
      )

      await Promise.all(
        cities.map(async (city: any) => {
          await CommonSettings.update(
            { cityId: city.name },
            { where: { cityId: city.id }, transaction }
          )
        })
      )

      await queryInterface.changeColumn(
        'CommonSettings',
        'cityId',
        {
          type: queryInterface.Sequelize.STRING
        },
        { transaction }
      )

      await queryInterface.renameColumn('CommonSettings', 'cityId', 'city', {
        transaction
      })

      await transaction.commit()
    } catch (error) {
      console.log(error)
      await transaction.rollback()
    }
  }
}
