// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sequelize'... Remove this comment to see the full error message
const { sequelize } = require('../models').init()
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const ContactsRepo = require('../repositories/contacts')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'handlerErr... Remove this comment to see the full error message
const handlerError = require('../utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.get = async function (req: any, res: any) {
  try {
    const contacts = await ContactsRepo.one({})
    if (!contacts) return handlerError(res, 'Контакты пусты', 409)
    res.status(200).json(contacts)
  } catch (e) {
    handlerError(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.update = async function (req: any, res: any) {
  const transition = await sequelize.transaction()

  try {
    const where = { id: req.params.id }
    const contacts = await ContactsRepo.update(where, req.body, transition)
    await transition.commit()
    res.status(200).json(contacts)
  } catch (e) {
    await transition.rollback()
    handlerError(res, e)
  }
}
