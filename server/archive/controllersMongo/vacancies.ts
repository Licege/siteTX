// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const Vacancies = require('../modelsMongo/Vacancy')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../src/utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getAll = async function (req: any, res: any) {
  try {
    const vacancies = await Vacancies.find({})
    res.status(200).json(vacancies)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getById = async function (req: any, res: any) {
  try {
    const vacancy = await Vacancies.findOne({ _id: req.params.id })
    res.status(200).json(vacancy)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.create = async function (req: any, res: any) {
  try {
    const vacancy = await new Vacancies({
      title: req.body.title,
      requirements: req.body.requirements,
      description: req.body.description,
      salary_from: req.body.salary_from,
      salary_to: req.body.salary_to,
      imageSrc: req.file ? req.file.path : ''
    }).save()
    res.status(200).json(vacancy)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.update = async function (req: any, res: any) {
  const updated = {
    title: req.body.title,
    requirements: req.body.requirements,
    description: req.body.description,
    salary_from: req.body.salary_from,
    salary_to: req.body.salary_to
  }
  if (req.file) {
    // @ts-expect-error TS(2339): Property 'imageSrc' does not exist on type '{ titl... Remove this comment to see the full error message
    updated.imageSrc = req.file.path
  }

  try {
    const vacancy = await Vacancies.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updated },
      { new: true }
    )
    res.status(200).json(vacancy)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.remove = async function (req: any, res: any) {
  try {
    await Vacancies.remove({ _id: req.params.id })
    res.status(200).json({
      message: 'Вакансия успешно удалена.'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}
