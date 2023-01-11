// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sequelize'... Remove this comment to see the full error message
const { sequelize } = require('../models').init()
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const PromosRepo = require('../repositories/promo')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getAll = async function (req: any, res: any) {
  try {
    const where = {}
    if (req.query.status) {
      // @ts-expect-error TS(2339): Property 'status' does not exist on type '{}'.
      where.status = req.query.status
    }
    const promos = await PromosRepo.all(where)
    res.status(200).json(promos)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getById = async function (req: any, res: any) {
  try {
    const promo = await PromosRepo.findById(req.params.id)
    res.status(200).json(promo)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.create = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  const promoToCreate = {
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    description: req.body.description,
    status: req.body.status,
    imageSrc: req.file ? req.file.path : ''
  }
  try {
    const promo = await PromosRepo.create(promoToCreate, transaction)
    await transaction.commit()
    res.status(201).json(promo)
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.update = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  const promoToUpdate = {
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    description: req.body.description,
    status: req.body.status
  }

  if (req.file) {
    // @ts-expect-error TS(2339): Property 'imageSrc' does not exist on type '{ titl... Remove this comment to see the full error message
    promoToUpdate.imageSrc = req.file
  }

  const id = req.params.id
  const where = { id }
  try {
    await PromosRepo.update(where, promoToUpdate, transaction)
    await transaction.commit()
    const promo = await PromosRepo.findById(id)
    res.status(200).json(promo)
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.remove = async (req: any, res: any) => {
  const { id } = req.params

  await PromosRepo.destroyById(id)
  res.status(200).json({ id: +id })
}
