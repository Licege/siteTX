// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sequelize'... Remove this comment to see the full error message
const { sequelize } = require('../models').init()
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const NewsRepo = require('../repositories/news')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'handleErro... Remove this comment to see the full error message
const handleError = require('../utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getAll = async function (req: any, res: any) {
  try {
    const news = await NewsRepo.all({})
    const totalCount = await NewsRepo.total({})
    res.status(200).json({
      news,
      totalCount
    })
  } catch (e) {
    handleError(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getById = async function (req: any, res: any) {
  try {
    const news = await NewsRepo.findById(req.params.id)
    res.status(200).json(news)
  } catch (e) {
    handleError(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.create = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()
  const newsToAdd = {
    title: req.body.title,
    description: req.body.description,
    shortDescription: req.body.shortDescription,
    imageSrc: req.file ? req.file.path : ''
  }

  try {
    const news = await NewsRepo.create(newsToAdd, transaction)
    await transaction.commit()
    res.status(201).json(news)
  } catch (e) {
    await transaction.rollback()
    handleError(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.update = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()
  const newsToUpdate = {
    title: req.body.title,
    description: req.body.description,
    shortDescription: req.body.shortDescription
  }

  if (req.file) {
    // @ts-expect-error TS(2339): Property 'imageSrc' does not exist on type '{ titl... Remove this comment to see the full error message
    newsToUpdate.imageSrc = req.file.path
  }

  const id = req.params.id
  const where = { id }

  try {
    await NewsRepo.update(where, newsToUpdate, transaction)
    await transaction.commit()
    const news = await NewsRepo.findById(id)
    res.status(200).json(news)
  } catch (e) {
    await transaction.rollback()
    handleError(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.delete = async function (req: any, res: any) {
  const { id } = req.params
  const transaction = await sequelize.transaction()

  try {
    await NewsRepo.destroyById(id, transaction)
    await transaction.commit()
    res.status(200).json({ id: +id })
  } catch (e) {
    await transaction.rollback()
    handleError(res, e)
  }
}
