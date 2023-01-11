// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sequelize'... Remove this comment to see the full error message
const { sequelize } = require('../models').init()
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const VacanciesRepo = require('../repositories/vacancy')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getAll = async function (req: any, res: any) {
  try {
    const vacancies = await VacanciesRepo.all(
      {},
      {
        order: [
          ['updatedAt', 'DESC'],
          ['createdAt', 'DESC']
        ]
      }
    )
    res.status(200).json(vacancies)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getById = async function (req: any, res: any) {
  try {
    const vacancy = await VacanciesRepo.findById(req.params.id)
    res.status(200).json(vacancy)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.create = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  const vacancyToCreate = {
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    description: req.body.description,
    salaryFrom: req.body.salaryFrom,
    salaryTo: req.body.salaryTo,
    imageSrc: req.file ? req.file.path : ''
  }

  try {
    const vacancy = await VacanciesRepo.create(vacancyToCreate, transaction)
    await transaction.commit()
    res.status(200).json(vacancy)
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.update = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  const vacancyToUpdate = {
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    description: req.body.description,
    salaryFrom: req.body.salaryFrom,
    salaryTo: req.body.salaryTo
  }
  if (req.file) {
    // @ts-expect-error TS(2339): Property 'imageSrc' does not exist on type '{ titl... Remove this comment to see the full error message
    vacancyToUpdate.imageSrc = req.file.path
  }

  try {
    const where = { id: req.params.id }

    const vacancy = await VacanciesRepo.update(
      where,
      vacancyToUpdate,
      transaction
    )
    await transaction.commit()
    res.status(200).json(vacancy)
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.remove = async function (req: any, res: any) {
  const { id } = req.params

  try {
    await VacanciesRepo.destroyById(id)

    res.status(200).json(+id)
  } catch (e) {
    // @ts-expect-error TS(2304): Cannot find name 'transaction'.
    await transaction.rollback()
    errorHandler(res, e)
  }
}
