// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'User'.
const User = require('../modelsMongo/User')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../src/utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getAll = async function (req: any, res: any) {
  const query = {}
  if (req.query.surname) {
    // @ts-expect-error TS(2339): Property 'surname' does not exist on type '{}'.
    query.surname = new RegExp('^' + req.query.surname + '$', 'i')
  }

  if (req.query.forename) {
    // @ts-expect-error TS(2339): Property 'forename' does not exist on type '{}'.
    query.forename = new RegExp('^' + req.query.forename + '$', 'i')
  }

  if (req.query.email) {
    // @ts-expect-error TS(2339): Property 'email' does not exist on type '{}'.
    query.email = req.query.email
  }

  if (req.query.age_start) {
    // @ts-expect-error TS(2339): Property 'age' does not exist on type '{}'.
    query.age = {
      $gte: req.query.age_start
    }
  }

  if (req.query.age_end) {
    if (!req.query.age_start) {
      // @ts-expect-error TS(2339): Property 'age' does not exist on type '{}'.
      query.age = {}
    }
    // @ts-expect-error TS(2339): Property 'age' does not exist on type '{}'.
    query.age[$lte] = req.query.age_end
  }

  if (req.query.phone) {
    // @ts-expect-error TS(2339): Property 'phone' does not exist on type '{}'.
    query.phone = req.query.phone
  }

  try {
    const users = await User.find(query)
    const total_count = await User.find(query).countDocuments()
    res.status(200).json({ users, total_count })
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getById = async function (req: any, res: any) {
  try {
    const user = await User.findOne({ _id: req.params.id })
    res.status(200).json(user)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.update = async function (req: any, res: any) {
  const updated = {
    password: req.body.password,
    surname: req.body.surname,
    forename: req.body.forename,
    patronymic: req.body.patronymic,
    phone: req.body.phone,
    card_number: req.body.card_number,
    birthday: req.body.birthday
  }

  if (req.file) {
    // @ts-expect-error TS(2339): Property 'imageSrc' does not exist on type '{ pass... Remove this comment to see the full error message
    updated.imageSrc = req.file.path
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updated },
      { new: true }
    )
    res.status(200).json(user)
  } catch (e) {
    errorHandler(res, e)
  }
}
