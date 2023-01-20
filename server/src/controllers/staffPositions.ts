import StaffPositionRepo from '../repositories/staffPositions';

export const findAll = async (req: any, res: any) => {
  const positions = await StaffPositionRepo.all({})

  res.status(200).json(positions)
}

export const findById = async (req: any, res: any) => {
  const { id } = req.query

  const position = await StaffPositionRepo.findById(id)

  res.status(200).json(position)
}

export const create = async (req: any, res: any) => {
  const { name } = req.body

  const position = await StaffPositionRepo.create({ name })

  res.status(200).json(position)
}

export const update = async (req: any, res: any) => {
  const { id } = req.query
  const { name } = req.body

  await StaffPositionRepo.update({ id }, { name })
  const position = await StaffPositionRepo.findById(id)

  res.status(200).json(position)
}

export const destroy = async (req: any, res: any) => {
  const { id } = req.query

  await StaffPositionRepo.destroyById(id)

  res.status(200).json({ id })
}
