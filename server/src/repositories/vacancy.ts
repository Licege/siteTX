// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const { Vacancy: VacancyModel } = require('../models').init()
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'createBasi... Remove this comment to see the full error message
const createBasicMethods = require('../lib/factories/modelFactory')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const { makeVacancy } = require('../entity/vacancy')

const Vacancy = createBasicMethods(VacancyModel)

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = {
  ...Vacancy,
  findById: async (
    id: any,
    { transaction = null, attributes = null, paranoid = true } = {}
  ) => {
    const vacancy = await Vacancy.findById(id, {
      transaction,
      attributes,
      paranoid
    })
    return makeVacancy(vacancy)
  },
  one: async (
    where: any,
    {
      transaction = null,
      attributes = null,
      include = null,
      paranoid = true
    } = {}
  ) => {
    const vacancy = await Vacancy.one(where, {
      transaction,
      attributes,
      include,
      paranoid
    })
    return makeVacancy(vacancy)
  },
  all: async (
    where: any,
    {
      transaction,
      attributes,
      limit,
      offset,
      include,
      group,
      order,
      paranoid
    }: any = {}
  ) => {
    const vacancies = await Vacancy.all(where, {
      transaction,
      attributes,
      limit,
      offset,
      include,
      group,
      order,
      paranoid
    })

    return vacancies.map((vacancy: any) => makeVacancy(vacancy));
  },
  create: async (values: any, transaction: any) => {
    const vacancy = await Vacancy.create(values, transaction)
    return makeVacancy(vacancy)
  }
}
