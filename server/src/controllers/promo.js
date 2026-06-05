const path = require('path')
const { sequelize } = require('../models').init()
const PromosRepo = require('../repositories/promo')
const fileLib = require('../lib/file')
const errorHandler = require('../utils/errorHandler')

const parseBoolean = (value) => {
  if (value === undefined || value === null || value === '') return false
  if (value === false || value === 'false' || value === '0' || value === 0) {
    return false
  }
  return true
}

const isPublicPromoRoute = (req) => req.originalUrl.includes('/api/public/promos')

module.exports.getAll = async function (req, res) {
  try {
    const where = {}
    if (req.query.status) {
      where.status = req.query.status
    }
    if (isPublicPromoRoute(req)) {
      where.show = true
    }
    const promos = await PromosRepo.all(where)
    res.status(200).json(promos)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getById = async function (req, res) {
  try {
    const promo = await PromosRepo.findById(req.params.id)

    if (!promo) {
      return res.status(404).json({ message: 'Promo not found' })
    }

    if (isPublicPromoRoute(req) && !promo.show) {
      return res.status(404).json({ message: 'Promo not found' })
    }

    res.status(200).json(promo)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function (req, res) {
  const transaction = await sequelize.transaction()
  const destination = path.resolve(__dirname, '../../', 'uploads')
  let imageSrc = ''

  if (req.file) {
    imageSrc = await fileLib.uploadFile(req.file, destination, {
      format: 'webp'
    })
  }

  const promoToCreate = {
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    description: req.body.description,
    show: parseBoolean(req.body.show),
    imageSrc
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

module.exports.update = async function (req, res) {
  const transaction = await sequelize.transaction()
  const destination = path.resolve(__dirname, '../../', 'uploads')

  const promoToUpdate = {
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    description: req.body.description,
    show: parseBoolean(req.body.show)
  }

  if (req.file) {
    promoToUpdate.imageSrc = await fileLib.uploadFile(req.file, destination, {
      format: 'webp'
    })
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

module.exports.remove = async (req, res) => {
  const { id } = req.params

  await PromosRepo.destroyById(id)
  res.status(200).json({ id: +id })
}
