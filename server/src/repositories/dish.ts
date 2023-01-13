import models from '../models';
import createBasicMethods from '../lib/factories/modelFactory';
import { makeDish } from '../entity/dish';

const { Dish: DishModel } = models;
const Dish = createBasicMethods(DishModel)

const dishRepository = {
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
  create: async (values: any, transaction?: any) => {
    const dish = await Dish.create(values, transaction)
    return makeDish(dish)
  }
}

export default dishRepository
