// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const Promos = require('../modelsMongo/Promo')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../src/utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getAll = async function (req: any, res: any) {
  try {
    const query = {}
    if (req.query.status) {
      // @ts-expect-error TS(2339): Property 'status' does not exist on type '{}'.
      query.status = req.query.status
    }
    const promos = await Promos.find(query)
    res.status(200).json(promos)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getById = async function (req: any, res: any) {
  try {
    const promo = await Promos.findOne({ _id: req.params.id })
    res.status(200).json(promo)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.create = async function (req: any, res: any) {
  const promo = new Promos({
    title: req.body.title,
    short_description: req.body.short_description,
    description: req.body.description,
    status: req.body.status,
    imageSrc: req.file ? req.file.path : ''
  })
  try {
    await promo.save()
    res.status(201).json(promo)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.update = async function (req: any, res: any) {
  const updated = {
    title: req.body.title,
    short_description: req.body.short_description,
    description: req.body.description,
    status: req.body.status
  }

  if (req.file) {
    // @ts-expect-error TS(2339): Property 'imageSrc' does not exist on type '{ titl... Remove this comment to see the full error message
    updated.imageSrc = req.file
  }
  try {
    const promo = await Promos.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updated },
      { new: true }
    )
    res.status(200).json(promo)
  } catch (e) {
    errorHandler(res, e)
  }
}
