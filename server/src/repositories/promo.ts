import models from '../models';
import createBasicMethods from '../lib/factories/modelFactory';
import { makePromo } from '../entity/promo'

const { Promo: PromoModel } = models;

const Promo = createBasicMethods(PromoModel)
const promoRepository = {
  ...Promo,
  findById: async (
    id: any,
    { transaction = null, attributes = null, paranoid = true } = {}
  ) => {
    const promo = await Promo.findById(id, {
      transaction,
      attributes,
      paranoid
    })
    return makePromo(promo)
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
    const promo = await Promo.one(where, {
      transaction,
      attributes,
      include,
      paranoid
    })
    return makePromo(promo)
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
    const promos = await Promo.all(where, {
      transaction,
      attributes,
      limit,
      offset,
      include,
      group,
      order,
      paranoid
    })

    return promos.map((promo: any) => makePromo(promo));
  },
  create: async (values: any, transaction: any) => {
    const promo = await Promo.create(values, transaction)
    return makePromo(promo)
  }
}

export default createBasicMethods(promoRepository)