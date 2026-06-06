const fs = require('fs').promises
const path = require('path')
const {Op} = require('sequelize')
const GalleryRepo = require('../repositories/gallery')
const pdfLib = require('../lib/pdf/splitPdfToImages')
const handleError = require('../utils/errorHandler')

const TYPE_MENU = 'MENU'
const TYPE_BAR = 'BAR'
const TYPE_BANQUET = 'BANQUET'

const TYPE_BY_PARAM = {
  menu: TYPE_MENU,
  bar: TYPE_BAR,
  banquet: TYPE_BANQUET
}

const MENU_DOCUMENT_TYPES = [TYPE_MENU, TYPE_BAR, TYPE_BANQUET]

const getTypeFromParams = (typeParam) => {
  const type = TYPE_BY_PARAM[typeParam?.toLowerCase()]

  if (!type) {
    const error = new Error('Неверный тип меню')
    error.status = 400
    throw error
  }

  return type
}

const isSafeUploadPath = (filePath) => {
  if (!filePath || typeof filePath !== 'string') return false

  const normalized = filePath.replace(/\\/g, '/')

  return normalized.startsWith('uploads/') && !normalized.includes('..')
}

const isTempUploadPath = (filePath) => {
  const normalized = filePath.replace(/\\/g, '/')

  return isSafeUploadPath(filePath) && normalized.startsWith('uploads/temp/')
}

const deleteFileIfExists = async (relativePath, uploadsRoot) => {
  if (!isSafeUploadPath(relativePath)) return

  const fullPath = pdfLib.getUploadFullPath(uploadsRoot, relativePath)

  try {
    await fs.unlink(fullPath)
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(error)
    }
  }
}

const upsertDocument = async (type, values) => {
  const existing = await GalleryRepo.one({ type })

  if (existing) {
    await GalleryRepo.update({ type }, values)
    return GalleryRepo.one({ type })
  }

  return GalleryRepo.create({ type, files: [], ...values })
}

const parsePagesPayload = (rawPages) => {
  if (Array.isArray(rawPages)) {
    return rawPages
  }

  let pages = []

  try {
    pages = JSON.parse(rawPages || '[]')
  } catch (error) {
    const parseError = new Error('Неверный формат страниц')
    parseError.status = 400
    throw parseError
  }

  if (!Array.isArray(pages)) {
    const formatError = new Error('Неверный формат страниц')
    formatError.status = 400
    throw formatError
  }

  return pages
}

exports.getAll = async (req, res) => {
  try {
    const documents = await GalleryRepo.all({
      type: {[Op.in]: MENU_DOCUMENT_TYPES}
    })
    res.status(200).json(documents)
  } catch (e) {
    handleError(res, e, e.status || 500)
  }
}

exports.getByType = async (req, res) => {
  try {
    const type = getTypeFromParams(req.params.type)
    const document = await GalleryRepo.one({ type })

    if (!document) {
      return res.status(404).json({ msg: 'Меню не найдено' })
    }

    res.status(200).json(document)
  } catch (e) {
    handleError(res, e, e.status || 500)
  }
}

exports.splitPdf = async (req, res) => {
  try {
    const pdfFile = req.file

    if (!pdfFile) {
      return res.status(400).json({ msg: 'Загрузите PDF-файл' })
    }

    const uploadsRoot = path.resolve(__dirname, '../../', 'uploads')
    const pages = await pdfLib.splitPdfToImages(pdfFile.buffer, uploadsRoot, {
      prefix: 'menu-page'
    })

    res.status(200).json({ pages })
  } catch (e) {
    handleError(res, e, e.status || 500)
  }
}

exports.update = async (req, res) => {
  try {
    const type = getTypeFromParams(req.params.type)
    const uploadsRoot = path.resolve(__dirname, '../../', 'uploads')
    const existing = await GalleryRepo.one({ type })
    const oldFiles = existing?.files || []
    const pages = parsePagesPayload(req.body.pages)
    const resultFiles = []

    for (const page of pages) {
      if (page.kind === 'existing') {
        if (!isSafeUploadPath(page.path)) {
          return res.status(400).json({ msg: 'Недопустимый путь к файлу' })
        }

        if (!existing || !oldFiles.includes(page.path)) {
          return res.status(400).json({ msg: 'Файл не принадлежит этому меню' })
        }

        resultFiles.push(page.path)
        continue
      }

      if (page.kind === 'temp') {
        if (!isTempUploadPath(page.path)) {
          return res.status(400).json({ msg: 'Недопустимый временный файл' })
        }

        const permanentPath = await pdfLib.moveTempToPermanent(uploadsRoot, page.path)
        resultFiles.push(permanentPath)
        continue
      }

      return res.status(400).json({ msg: 'Неверный тип страницы' })
    }

    const filesToDelete = oldFiles.filter((filePath) => !resultFiles.includes(filePath))

    for (const filePath of filesToDelete) {
      await deleteFileIfExists(filePath, uploadsRoot)
    }

    const document = await upsertDocument(type, {
      files: resultFiles,
      previewSrc: resultFiles[0] || null,
      pdfSrc: null
    })

    res.status(200).json(document)
  } catch (e) {
    handleError(res, e, e.status || 500)
  }
}

exports.getAllMenu = async (req, res) => {
  req.params = { type: 'menu' }
  return exports.getByType(req, res)
}

exports.getAllBar = async (req, res) => {
  req.params = { type: 'bar' }
  return exports.getByType(req, res)
}

exports.createOrUpdateMenu = exports.update
exports.createOrUpdateBar = exports.update
