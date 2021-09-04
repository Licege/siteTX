const StaffPositionRepo = require('../repositories/staffPositions')

exports.findAll = async (req, res) => {
  const positions = await StaffPositionRepo.all({});

  res.status(200).json(positions)
}

exports.findById = async (req, res) => {
  const { id } = req.query

  const position = await StaffPositionRepo.findById(id)

  res.status(200).json(position)
}

exports.create = async (req, res) => {
  const { name } = req.body

  const position = await StaffPositionRepo.create({ name })

  res.status(200).json(position)
}

exports.update = async (req, res) => {
  const { id } = req.query
  const { name } = req.body

  await StaffPositionRepo.update({ id }, { name })
  const position = await StaffPositionRepo.findById(id)

  res.status(200).json(position)
}

exports.destroy = async (req, res) => {
  const { id } = req.query

  await StaffPositionRepo.destroyById(id);

  res.status(200).json({ id })
}