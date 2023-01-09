module.exports = {
  up: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      const cities = await queryInterface.bulkInsert(
        'Cities',
        [
          {
            name: 'Калининград'
          }
        ],
        { transaction }
      )

      await Promise.all(
        cities.map(async (city) => {
          await queryInterface.bulkInsert(
            'CommonSettings',
            [
              {
                cityId: city.id,
                priceForDelivery: 250,
                freeDelivery: 1000,
                isDelivery: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }
            ],
            { transaction }
          )
        })
      )

      await transaction.commit()
    } catch (error) {
      console.log(error)
      await transaction.rollback()
    }
  },

  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      const [cities] = await queryInterface.sequelize.query(
        `SELECT * FROM "Cities" WHERE "name"='Калининград'`,
        { transaction }
      )

      const citiesIds = cities.map(({ id }) => id)

      await queryInterface.bulkDelete(
        'CommonSettings',
        { cityId: citiesIds },
        { transaction }
      )

      await transaction.commit()
    } catch (error) {
      console.log(error)
      await transaction.rollback()
    }
  }
}
