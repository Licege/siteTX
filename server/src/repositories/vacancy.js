const { Vacancy: VacancyModel } = require('../models').init()
const createBasicMethods = require('../lib/factories/modelFactory')
const { makeVacancy } = require('../entity/vacancy')

const Vacancy = createBasicMethods(VacancyModel)

module.exports = {
    ...Vacancy,
    findById: async (id, { transaction = null, attributes = null, paranoid = true } = {}) => {
        const vacancy = await Vacancy.findById(id, { transaction, attributes, paranoid })
        return makeVacancy(vacancy)
    },
    one: async (where, { transaction = null, attributes = null, include = null, paranoid = true } = {}) => {
        const vacancy = await Vacancy.one(where, { transaction, attributes, include, paranoid })
        return makeVacancy(vacancy)
    },
    all: async (where,
                {
                    transaction,
                    attributes,
                    limit,
                    offset,
                    include,
                    group,
                    order,
                    paranoid
                } = {}) => {
        const vacancies = await Vacancy.all(where,
          {
              transaction,
              attributes,
              limit,
              offset,
              include,
              group,
              order,
              paranoid
          })

        return vacancies.map(vacancy => makeVacancy(vacancy));
    },
    create: async (values, transaction) => {
        const vacancy = await Vacancy.create(values, transaction)
        return makeVacancy(vacancy);
    }
}