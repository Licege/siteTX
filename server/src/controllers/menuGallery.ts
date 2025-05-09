import GalleryRepo from '../repositories/gallery';

const TYPE_MENU = 'Menu'
const TYPE_BAR = 'BAR'

export const getAllMenu = async (req: any, res: any) => {
  const menu = await GalleryRepo.one({ type: TYPE_MENU, attributes: ['files'] })

  res.status(200).json(menu)
}

export const getAllBar = async (req: any, res: any) => {
  const bar = await GalleryRepo.one({ type: TYPE_BAR, attributes: ['files'] })

  res.status(200).json(bar)
}

export const createOrUpdateMenu = async (req: any, res: any) => {
  const { files } = req.body

  const result = await GalleryRepo.createOrUpdate({ type: TYPE_MENU }, files)

  res.status(200).json(result)
}

export const createOrUpdateBar = async (req: any, res: any) => {
  const { files } = req.body

  const result = await GalleryRepo.createOrUpdate({ type: TYPE_BAR }, files)

  res.status(200).json(result)
}
