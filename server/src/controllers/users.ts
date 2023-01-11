// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sequelize'... Remove this comment to see the full error message
const { sequelize } = require('../models').init()
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'UserRepo'.
const UserRepo = require('../repositories/user')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getAll = async function (req: any, res: any) {
  const where = {}
  if (req.query.surname) {
    // @ts-expect-error TS(2339): Property 'surname' does not exist on type '{}'.
    where.surname = new RegExp('^' + req.query.surname + '$', 'i')
  }

  if (req.query.forename) {
    // @ts-expect-error TS(2339): Property 'forename' does not exist on type '{}'.
    where.forename = new RegExp('^' + req.query.forename + '$', 'i')
  }

  if (req.query.email) {
    // @ts-expect-error TS(2339): Property 'email' does not exist on type '{}'.
    where.email = req.query.email
  }

  if (req.query.ageStart) {
    // @ts-expect-error TS(2339): Property 'age' does not exist on type '{}'.
    where.age = {
      $gte: req.query.ageStart
    }
  }

  if (req.query.ageEnd) {
    if (!req.query.ageStart) {
      // @ts-expect-error TS(2339): Property 'age' does not exist on type '{}'.
      where.age = {}
    }
    // @ts-expect-error TS(2339): Property 'age' does not exist on type '{}'.
    where.age[$lte] = req.query.ageEnd
  }

  if (req.query.phone) {
    // @ts-expect-error TS(2339): Property 'phone' does not exist on type '{}'.
    where.phone = req.query.phone
  }

  try {
    const users = await UserRepo.all(where)
    const totalCount = users.length
    res.status(200).json({ users, totalCount })
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getById = async function (req: any, res: any) {
  try {
    const user = await UserRepo.findById(req.params.id)
    res.status(200).json(user)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.update = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  const userToUpdate = {
    password: req.body.password,
    surname: req.body.surname,
    forename: req.body.forename,
    patronymic: req.body.patronymic,
    phone: req.body.phone,
    birthday: req.body.birthday
  }

  if (req.file) {
    // @ts-expect-error TS(2339): Property 'imageSrc' does not exist on type '{ pass... Remove this comment to see the full error message
    userToUpdate.imageSrc = req.file.path
  }

  try {
    const where = { id: req.params.id }

    const user = await UserRepo.update(where, userToUpdate, transaction)
    await transaction.commit()
    res.status(200).json(user)
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}
