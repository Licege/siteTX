// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const { Promo: PromoModel } = require('../models').init()
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'createBasi... Remove this comment to see the full error message
const createBasicMethods = require('../lib/factories/modelFactory')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const { makePromo } = require('../entity/promo')

const Promo = createBasicMethods(PromoModel)

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = {
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
