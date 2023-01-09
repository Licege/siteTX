const { CommonSettings: CommonDeliveryModel, City: CityModel } =
  require('../models').init()
const createBasicMethods = require('../lib/factories/modelFactory')

const CommonDelivery = createBasicMethods(CommonDeliveryModel)

function findById(
  id,
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
  where,
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
  where,
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

module.exports = {
  ...CommonDelivery,
  findById,
  one,
  all
}
