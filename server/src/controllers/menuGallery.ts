// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const GalleryRepo = require('../repositories/gallery')

const TYPE_MENU = 'Menu'
const TYPE_BAR = 'BAR'

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.getAllMenu = async (req: any, res: any) => {
  const menu = await GalleryRepo.one({ type: TYPE_MENU, attributes: ['files'] })

  res.status(200).json(menu)
}

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.getAllBar = async (req: any, res: any) => {
  const bar = await GalleryRepo.one({ type: TYPE_BAR, attributes: ['files'] })

  res.status(200).json(bar)
}

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.createOrUpdateMenu = async (req: any, res: any) => {
  const { files } = req.body

  const result = await GalleryRepo.createOrUpdate({
    where: { type: TYPE_MENU },
    values: files
  })

  res.status(200).json(result)
}

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.createOrUpdateBar = async (req: any, res: any) => {
  const { files } = req.body

  const result = await GalleryRepo.createOrUpdate({
    where: { type: TYPE_BAR },
    values: files
  })

  res.status(200).json(result)
}
