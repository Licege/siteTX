const fs = require('fs').promises
const path = require('path')
const {createCanvas} = require('@napi-rs/canvas')
const sharp = require('sharp')
const pdfjs = require('./setupPdfJs')

const nodeCanvasFactory = {
  create(width, height) {
    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')

    return {canvas, context}
  },
  reset(canvasAndContext, width, height) {
    canvasAndContext.canvas.width = width
    canvasAndContext.canvas.height = height
  },
  destroy(canvasAndContext) {
    canvasAndContext.canvas.width = 0
    canvasAndContext.canvas.height = 0
    canvasAndContext.canvas = null
    canvasAndContext.context = null
  }
}

const toRelativeUploadPath = (uploadsRoot, fullPath) => {
  const relative = path.relative(uploadsRoot, fullPath).replace(/\\/g, '/')

  return `uploads/${relative}`
}

exports.splitPdfToImages = async (pdfBuffer, uploadsRoot, {prefix = 'menu-page'} = {}) => {
  const tempDir = path.join(uploadsRoot, 'temp')
  await fs.mkdir(tempDir, {recursive: true})

  const pdf = await pdfjs.getDocument({
    data: new Uint8Array(pdfBuffer),
    canvasFactory: nodeCanvasFactory
  }).promise
  const pages = []
  const stamp = Date.now()

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber)
    const viewport = page.getViewport({scale: 2})
    const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height))
    const context = canvas.getContext('2d')

    await page.render({
      canvasContext: context,
      viewport,
      canvasFactory: nodeCanvasFactory
    }).promise

    const jpegBuffer = await canvas.encode('jpeg', 92)
    const fileName = `${prefix}-${stamp}-${pageNumber}.webp`
    const fullPath = path.join(tempDir, fileName)

    await sharp(jpegBuffer).webp().toFile(fullPath)

    const relativePath = toRelativeUploadPath(uploadsRoot, fullPath)

    pages.push({
      id: relativePath,
      path: relativePath
    })
  }

  return pages
}

exports.saveImagesToTemp = async (files, uploadsRoot, {prefix = 'menu-page'} = {}) => {
  const tempDir = path.join(uploadsRoot, 'temp')
  await fs.mkdir(tempDir, {recursive: true})

  const stamp = Date.now()
  const pages = []

  for (let index = 0; index < files.length; index += 1) {
    const fileName = `${prefix}-${stamp}-${index + 1}.webp`
    const fullPath = path.join(tempDir, fileName)

    await sharp(files[index].buffer).webp().toFile(fullPath)

    const relativePath = toRelativeUploadPath(uploadsRoot, fullPath)

    pages.push({
      id: relativePath,
      path: relativePath
    })
  }

  return pages
}

exports.getUploadFullPath = (uploadsRoot, relativePath) => {
  const normalized = relativePath.replace(/\\/g, '/').replace(/^uploads\/?/, '')

  return path.join(uploadsRoot, normalized)
}

const findExistingMovedFile = async (uploadsRoot, tempRelativePath) => {
  const baseName = path.basename(tempRelativePath.replace(/\\/g, '/'))
  const entries = await fs.readdir(uploadsRoot)

  const match = entries.find((entry) => {
    if (entry === 'temp') return false

    return entry.endsWith(`-${baseName}`)
  })

  if (!match) return null

  return path.join('uploads', match).replace(/\\/g, '/')
}

exports.moveTempToPermanent = async (uploadsRoot, tempRelativePath) => {
  const normalizedTempPath = tempRelativePath.replace(/\\/g, '/')
  const sourcePath = exports.getUploadFullPath(uploadsRoot, normalizedTempPath)

  if (!normalizedTempPath.startsWith('uploads/temp/')) {
    throw new Error('Файл не находится во временной папке')
  }

  const fileName = `${Date.now()}-${path.basename(normalizedTempPath)}`
  const destinationPath = path.join(uploadsRoot, fileName)
  const relativePath = path.join('uploads', fileName).replace(/\\/g, '/')

  try {
    await fs.rename(sourcePath, destinationPath)
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error
    }

    const existingPath = await findExistingMovedFile(uploadsRoot, normalizedTempPath)

    if (existingPath) {
      return existingPath
    }

    throw error
  }

  return relativePath
}
