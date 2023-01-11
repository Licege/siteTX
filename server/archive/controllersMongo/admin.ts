// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const Admin = require('../modelsMongo/Admin')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../src/utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getAll = async function (req: any, res: any) {
  try {
    const admin = await Admin.find({}).populate('user_id')
    res.status(200).json(admin)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.create = async function (req: any, res: any) {
  try {
    const admin = await new Admin({
      user_id: req.params.id
    }).save()
    res.status(200).json(admin)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.remove = async function (req: any, res: any) {
  try {
    await Admin.remove({ user_id: req.params.id })
    res.status(200).json({
      message: 'Полномочия успешно удалены.'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}
