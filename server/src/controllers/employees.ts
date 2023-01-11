// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'StaffPosit... Remove this comment to see the full error message
const { StaffPosition } = require('../models').init()
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const EmployeeRepo = require('../repositories/employees')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const { makeEmployee } = require('../entity/employee')

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.create = async (req: any, res: any) => {
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

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.update = async (req: any, res: any) => {
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

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.remove = async (req: any, res: any) => {
  const { id } = req.params

  await EmployeeRepo.destroyById(id)

  res.status(200).json(id)
}

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.getAll = async (req: any, res: any) => {
  // Проверить права
  const { withFires = false, position } = req.query
  const { limit = 20, page = 1 } = req.body.pagination

  function constructWhere() {
    const where = {}

    if (!withFires) {
      // @ts-expect-error TS(2339): Property 'dateOfDismissal' does not exist on type ... Remove this comment to see the full error message
      where.dateOfDismissal = null
    }

    if (position) {
      // @ts-expect-error TS(2339): Property 'position' does not exist on type '{}'.
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
    .json({ data: employees.map((employee: any) => makeEmployee(employee)), total })
}

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.getAllForTips = async (req: any, res: any) => {
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
    .json({ data: employees.map((employee: any) => makeEmployee(employee)) })
}

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.getOneForTips = async (req: any, res: any) => {
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
