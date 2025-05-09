import models from '../models';
import createBasicMethods from '../lib/factories/modelFactory';
import { makeVacancy } from'../entity/vacancy';

const { Vacancy: VacancyModel } = models;

const Vacancy = createBasicMethods(VacancyModel)
const vacancyRepository = {
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

export default vacancyRepository
