const { CommonSettings: CommonDeliveryModel, City: CityModel } =
  // @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
  require('../models').init()
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'createBasi... Remove this comment to see the full error message
const createBasicMethods = require('../lib/factories/modelFactory')

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'CommonDeli... Remove this comment to see the full error message
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

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = {
  ...CommonDelivery,
  findById,
  one,
  all
}
