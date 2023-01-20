// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Category'.
const Category = require('../modelsMongo/Category')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../src/utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getAll = async function (req: any, res: any) {
  try {
    const categories = await Category.find({})
    res.status(200).json(categories)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.get = async function (req: any, res: any) {
  try {
    const category = await Category.findOne({ _id: req.params.id })
    res.status(200).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.remove = async function (req: any, res: any) {
  try {
    await Category.remove({ _id: req.params.id })
    res.status(200).json({
      message: 'Категория успешно удалена.'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.create = async function (req: any, res: any) {
  try {
    const category = await new Category({
      title: req.body.title,
      title_en: req.body.title_en
    }).save()
    res.status(200).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.update = async function (req: any, res: any) {
  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}
