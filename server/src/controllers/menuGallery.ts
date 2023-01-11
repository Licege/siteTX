const GalleryRepo = require('../repositories/gallery')

const TYPE_MENU = 'Menu'
const TYPE_BAR = 'BAR'

exports.getAllMenu = async (req, res) => {
  const menu = await GalleryRepo.one({ type: TYPE_MENU, attributes: ['files'] })

  res.status(200).json(menu)
}

exports.getAllBar = async (req, res) => {
  const bar = await GalleryRepo.one({ type: TYPE_BAR, attributes: ['files'] })

  res.status(200).json(bar)
}

exports.createOrUpdateMenu = async (req, res) => {
  const { files } = req.body

  const result = await GalleryRepo.createOrUpdate({
    where: { type: TYPE_MENU },
    values: files
  })

  res.status(200).json(result)
}

exports.createOrUpdateBar = async (req, res) => {
  const { files } = req.body

  const result = await GalleryRepo.createOrUpdate({
    where: { type: TYPE_BAR },
    values: files
  })

  res.status(200).json(result)
}
