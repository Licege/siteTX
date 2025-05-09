import models from '../models';
import EmployeeRepo from '../repositories/employees';
import { makeEmployee } from '../entity/employee';

const { StaffPosition } = models;

export const create = async (req: any, res: any) => {
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

export const update = async (req: any, res: any) => {
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

export const remove = async (req: any, res: any) => {
  const { id } = req.params

  await EmployeeRepo.destroyById(id)

  res.status(200).json(id)
}

export const getAll = async (req: any, res: any) => {
  // Проверить права
  const { withFires = false, position } = req.query
  const { limit = 20, page = 1 } = req.body.pagination

  function constructWhere() {
    const where: any = {}

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
    .json({ data: employees.map((employee: any) => makeEmployee(employee)), total })
}

export const getAllForTips = async (req: any, res: any) => {
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

export const getOneForTips = async (req: any, res: any) => {
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
