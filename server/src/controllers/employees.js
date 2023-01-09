const { StaffPosition } = require('../models').init()
const EmployeeRepo = require('../repositories/employees')
const { makeEmployee } = require('../entity/employee')

exports.create = async (req, res) => {
  const {
    lastName,
    firstName,
    middleName,
    positionId,
    phone,
    salary,
    address,
    dateOfEmployment
  } = req.body
  const avatarSrc = req.file ? req.file.path : ''

  const dataToCreate = {
    lastName,
    firstName,
    middleName,
    avatarSrc,
    positionId,
    phone,
    salary,
    address,
    dateOfEmployment
  }

  const newEmployeeData = await EmployeeRepo.create(dataToCreate)
  const newEmployee = await EmployeeRepo.findById(newEmployeeData.id, {
    include: { model: StaffPosition, attributes: ['name'], as: 'position' },
    attributes: {
      exclude: ['positionId']
    }
  })

  res.status(200).json(newEmployee)
}

exports.update = async (req, res) => {
  const { id } = req.params
  const {
    lastName,
    firstName,
    middleName,
    positionId,
    phone,
    salary,
    address,
    dateOfEmployment
  } = req.body
  const avatarSrc = req.file ? req.file.path : ''

  const dataToCreate = {
    lastName,
    firstName,
    middleName,
    avatarSrc,
    positionId,
    phone,
    salary,
    address,
    dateOfEmployment
  }

  await EmployeeRepo.update({ id }, dataToCreate)
  const updatedEmployee = await EmployeeRepo.findById(id)

  res.status(200).json(updatedEmployee)
}

exports.remove = async (req, res) => {
  const { id } = req.params

  await EmployeeRepo.destroyById(id)

  res.status(200).json(id)
}

exports.getAll = async (req, res) => {
  // Проверить права
  const { withFires = false, position } = req.query
  const { limit = 20, page = 1 } = req.body.pagination

  function constructWhere() {
    const where = {}

    if (!withFires) {
      where.dateOfDismissal = null
    }

    if (position) {
      where.position = position
    }

    return where
  }

  const employees = await EmployeeRepo.all(constructWhere(), {
    limit,
    offset: limit * (page - 1),
    include: { model: StaffPosition, attributes: ['name'], as: 'position' },
    attributes: {
      exclude: ['positionId']
    }
  })
  const total = await EmployeeRepo.total(constructWhere())

  res
    .status(200)
    .json({ data: employees.map((employee) => makeEmployee(employee)), total })
}

exports.getAllForTips = async (req, res) => {
  const employees = await EmployeeRepo.all(
    {
      dateOfDismissal: null,
      '$position.tips$': true
    },
    {
      include: { model: StaffPosition, attributes: ['name'], as: 'position' },
      attributes: ['id', 'avatarSrc', 'lastName', 'firstName', 'middleName']
    }
  )

  res
    .status(200)
    .json({ data: employees.map((employee) => makeEmployee(employee)) })
}

exports.getOneForTips = async (req, res) => {
  const { id } = req.params

  const employee = await EmployeeRepo.one(
    {
      id,
      dateOfDismissal: null,
      '$position.tips$': true
    },
    {
      include: { model: StaffPosition, attributes: ['name'], as: 'position' },
      attributes: ['id', 'avatarSrc', 'lastName', 'firstName', 'middleName']
    }
  )

  res.status(200).json(makeEmployee(employee))
}
