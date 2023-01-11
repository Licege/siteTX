// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'BanquetHal... Remove this comment to see the full error message
const BanquetHall = require('../modelsMongo/BanquetHall')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../src/utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getAll = async function (req: any, res: any) {
  try {
    const halls = await BanquetHall.find()
    res.status(200).json(halls)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.get = async function (req: any, res: any) {
  try {
    const hall = await BanquetHall.findOne({ _id: req.params.id })
    res.status(200).json(hall)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.create = async function (req: any, res: any) {
  try {
    const hall = await new BanquetHall({
      title: req.body.title,
      description: req.body.description,
      phone: req.body.phone,
      capacity: req.body.capacity
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getAll = async function (req: any, res: any) {
  try {
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getAll = async function (req: any, res: any) {
  try {
  } catch (e) {
    errorHandler(res, e)
  }
}
