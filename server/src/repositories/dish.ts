// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const { Dish: DishModel } = require('../models').init()
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'createBasi... Remove this comment to see the full error message
const createBasicMethods = require('../lib/factories/modelFactory')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const { makeDish } = require('../entity/dish')

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Dish'.
const Dish = createBasicMethods(DishModel)

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = {
  ...Dish,
  findById: async (
    id: any,
    { transaction = null, attributes = null, paranoid = true } = {}
  ) => {
    const dish = await Dish.findById(id, { transaction, attributes, paranoid })
    return makeDish(dish)
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
    const dish = await Dish.one(where, {
      transaction,
      attributes,
      include,
      paranoid
    })
    return makeDish(dish)
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
    const dishes = await Dish.all(where, {
      transaction,
      attributes,
      limit,
      offset,
      include,
      group,
      order,
      paranoid
    })

    return dishes.map((dish: any) => makeDish(dish));
  },
  create: async (values: any, transaction: any) => {
    const dish = await Dish.create(values, transaction)
    return makeDish(dish)
  }
}
