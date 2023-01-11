// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sequelize'... Remove this comment to see the full error message
const { sequelize } = require('../models').init()
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const CategoryRepo = require('../repositories/category')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getAll = async function (req: any, res: any) {
  try {
    const categories = await CategoryRepo.all({})
    res.status(200).json(categories)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.get = async function (req: any, res: any) {
  try {
    const category = await CategoryRepo.findById(req.params.id)
    res.status(200).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.remove = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  try {
    await CategoryRepo.destroyById(req.params.id)
    await transaction.commit()
    res.status(200).json({
      message: 'Категория успешно удалена.'
    })
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.create = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  try {
    const categoryToAdd = {
      title: req.body.title,
      titleEn: req.body.titleEn
    }

    const category = await CategoryRepo.create(categoryToAdd, transaction)
    await transaction.commit()
    res.status(200).json(category)
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.update = async function (req: any, res: any) {
  const { id } = req.params
  try {
    const where = { id }
    await CategoryRepo.update(where, req.body)

    const category = await CategoryRepo.findById(id)
    res.status(200).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}
