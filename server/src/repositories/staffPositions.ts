const { StaffPosition: StaffPositionModel } = require('../models').init()
const createBasicMethods = require('../lib/factories/modelFactory')

const StaffPosition = createBasicMethods(StaffPositionModel)

module.exports = {
  ...StaffPosition
}
