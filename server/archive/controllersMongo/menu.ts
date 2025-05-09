// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Dish'.
const Dish = require('../modelsMongo/Menu')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Category'.
const Category = require('../modelsMongo/Category')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const PdfMenu = require('../modelsMongo/PdfMenu')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../src/utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getAll = async function (req: any, res: any) {
  const query = {}

  if (req.query.category) {
    // @ts-expect-error TS(2339): Property 'category' does not exist on type '{}'.
    query.category = req.query.category
  }
  try {
    const dishes = await Dish.find(query)
    res.status(200).json(dishes)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getByCategory = async function (req: any, res: any) {
  try {
    const category = await Category.findOne({ title_en: req.params.id })
    const dishes = await Dish.find({ category_id: category._id })
    res.status(200).json(dishes)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getById = async function (req: any, res: any) {
  try {
    const dish = await Dish.findOne({ _id: req.params.id })
    res.status(200).json(dish)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.remove = async function (req: any, res: any) {
  try {
    await Dish.remove({ _id: req.params.id })
    res.status(200).json({
      message: 'Блюдо успешно удалено.'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.create = async function (req: any, res: any) {
  const dish = new Dish({
    title: req.body.title,
    description: req.body.description,
    weight: req.body.weight,
    cost: req.body.cost,
    category_id: req.body.category_id,
    imageSrc: req.file ? req.file.path : ''
  })

  try {
    await dish.save()
    res.status(201).json(dish)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.update = async function (req: any, res: any) {
  const updated = {
    title: req.body.title,
    description: req.body.description,
    weight: req.body.weight,
    cost: req.body.cost,
    category: req.body.category,
    is_delivery: req.body.is_delivery
  }

  if (req.file) {
    // @ts-expect-error TS(2339): Property 'imageSrc' does not exist on type '{ titl... Remove this comment to see the full error message
    updated.imageSrc = req.file.path
  }

  try {
    const dish = await Dish.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updated },
      { new: true }
    )
    res.status(200).json(dish)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports.uploadPdf = async function (req: any, res: any) {
  try {
    if (req.file) {
      const menu = {
        fileSrc: req.file.path
      }

      // @ts-expect-error TS(2339): Property 'save' does not exist on type '{ fileSrc:... Remove this comment to see the full error message
      await menu.save()
      res.status(201).json(menu)
    } else {
      res.status(400).json({
        message: 'Ошибка файл не найден!'
      })
    }
  } catch (e) {
    errorHandler(res, e)
  }
}
