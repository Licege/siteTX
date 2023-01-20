import models from '../models';
import createBasicMethods from '../lib/factories/modelFactory';

const { CommonSettings: CommonDeliveryModel, City: CityModel } = models;

const CommonDelivery = createBasicMethods(CommonDeliveryModel)

function findById(
  id: any,
  { transaction = null, attributes = null, paranoid = true } = {}
) {
  return CommonDelivery.findById(id, {
    transaction,
    attributes,
    paranoid,
    include: [{ model: CityModel, as: 'city' }]
  })
}

function one(
  where: any,
  { transaction = null, attributes = null, paranoid = true } = {}
) {
  return CommonDelivery.one(where, {
    transaction,
    attributes,
    paranoid,
    include: [{ model: CityModel, as: 'city' }]
  })
}

function all(
  where: any,
  {
    transaction = null,
    attributes = null,
    limit = null,
    offset = null,
    group = null,
    order = null,
    paranoid = true
  } = {}
) {
  return CommonDelivery.all(where, {
    transaction,
    attributes,
    paranoid,
    limit,
    offset,
    group,
    order,
    include: [{ model: CityModel, as: 'city' }]
  })
}

const deliveryCommonSettingsRepository = {
  ...CommonDelivery,
  findById,
  one,
  all
}

export default createBasicMethods(deliveryCommonSettingsRepository)
