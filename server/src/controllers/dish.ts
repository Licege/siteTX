// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'path'.
const path = require('path')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sequelize'... Remove this comment to see the full error message
const { sequelize, Category } = require('../models').init()
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'DishRepo'.
const DishRepo = require('../repositories/dish')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'fileLib'.
const fileLib = require('../lib/file')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getAll = async function (req: any, res: any) {
  const where = {}

  if (req.query.category) {
    // @ts-expect-error TS(2339): Property 'categoryId' does not exist on type '{}'.
    where.categoryId = req.query.category
  }
  try {
    const dishes = await DishRepo.all(where)
    res.status(200).json(dishes)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getByCategory = async function (req: any, res: any) {
  try {
    const where = { titleEn: req.params.category }
    const include = [
      {
        model: Category,
        attributes: [],
        where
      }
    ]
    const dishes = await DishRepo.all({}, { include })
    res.status(200).json(dishes)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getById = async function (req: any, res: any) {
  try {
    const dish = await DishRepo.findById(req.params.id)
    res.status(200).json(dish)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.remove = async function (req: any, res: any) {
  const { id } = req.params
  const transaction = await sequelize.transaction()

  try {
    await DishRepo.destroyById(id, transaction)
    await transaction.commit()
    res.status(200).json({ id: +id })
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.create = async function (req: any, res: any) {
  const { title, description, weight, cost, categoryId } = req.body
  let imageSrc = ''

  // @ts-expect-error TS(2304): Cannot find name '__dirname'.
  const destination = path.resolve(__dirname, '../../', 'uploads')

  if (req.file) {
    imageSrc = await fileLib.uploadFile(req.file, destination, {
      format: 'webp'
    })
  }

  const dishToAdd = {
    title,
    description,
    weight,
    cost,
    categoryId,
    imageSrc
  }

  try {
    const dish = await DishRepo.create(dishToAdd)
    res.status(201).json(dish)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports.update = async function (req: any, res: any) {
  const { id } = req.params

  // @ts-expect-error TS(2304): Cannot find name '__dirname'.
  const destination = path.resolve(__dirname, '../../', 'uploads')

  const { title, description, weight, cost, category, is_delivery } = req.body

  const updatedData = {
    title,
    description,
    weight,
    cost,
    category,
    is_delivery
  }

  if (req.file) {
    // @ts-expect-error TS(2339): Property 'imageSrc' does not exist on type '{ titl... Remove this comment to see the full error message
    updatedData.imageSrc = await fileLib.uploadFile(req.file, destination, {
      format: 'webp'
    })
  }

  const where = { id }

  try {
    await DishRepo.update(where, updatedData)
    const dish = await DishRepo.findById(id)
    res.status(200).json(dish)
  } catch (e) {
    errorHandler(res, e)
  }
}
