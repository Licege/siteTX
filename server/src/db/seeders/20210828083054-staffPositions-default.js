module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('StaffPositions', [
      { name: 'Управляющий', tips: false },
      { name: 'Официант', tips: true },
      { name: 'Повар', tips: false },
      { name: 'Клининг', tips: false }
    ])

    return queryInterface
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('StaffPositions', null, {})
  }
};
