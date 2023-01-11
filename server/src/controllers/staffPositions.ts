// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const StaffPositionRepo = require('../repositories/staffPositions')

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.findAll = async (req: any, res: any) => {
  const positions = await StaffPositionRepo.all({})

  res.status(200).json(positions)
}

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.findById = async (req: any, res: any) => {
  const { id } = req.query

  const position = await StaffPositionRepo.findById(id)

  res.status(200).json(position)
}

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.create = async (req: any, res: any) => {
  const { name } = req.body

  const position = await StaffPositionRepo.create({ name })

  res.status(200).json(position)
}

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.update = async (req: any, res: any) => {
  const { id } = req.query
  const { name } = req.body

  await StaffPositionRepo.update({ id }, { name })
  const position = await StaffPositionRepo.findById(id)

  res.status(200).json(position)
}

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.destroy = async (req: any, res: any) => {
  const { id } = req.query

  await StaffPositionRepo.destroyById(id)

  res.status(200).json({ id })
}
