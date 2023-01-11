// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const BanquetHallRepo = require('../repositories/banquetHall')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getAll = async function (req: any, res: any) {
  try {
    const halls = await BanquetHallRepo.all({})
    res.status(200).json(halls)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.get = async function (req: any, res: any) {
  try {
    const { id } = req.params

    const hall = await BanquetHallRepo.one(id)
    res.status(200).json(hall)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.create = async function (req: any, res: any) {
  try {
    // const hall = await new BanquetHall({
    //     title: req.body.title,
    //     description: req.body.description,
    //     phone: req.body.phone,
    //     capacity: req.body.capacity,
    // })
  } catch (e) {
    errorHandler(res, e)
  }
}
