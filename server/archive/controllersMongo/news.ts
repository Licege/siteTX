// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'News'.
const News = require('../modelsMongo/News')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'handleErro... Remove this comment to see the full error message
const handleError = require('../src/utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getAll = async function (req: any, res: any) {
  try {
    const news = await News.find({})
    const total_count = await News.countDocuments()
    res.status(200).json({
      news,
      total_count
    })
  } catch (e) {
    handleError(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getById = async function (req: any, res: any) {
  try {
    const news = await News.findOne({ _id: req.params.id })
    res.status(200).json(news)
  } catch (e) {
    handleError(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.create = async function (req: any, res: any) {
  // @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
  const News = require('../modelsMongo/News')
  // @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
  const handleError = require('../src/utils/errorHandler')

  // @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
  module.exports.getAll = async function (req: any, res: any) {
    try {
      const news = await News.find({})
      const total_count = await News.countDocuments()
      res.status(200).json({
        news,
        total_count
      })
    } catch (e) {
      handleError(res, e)
    }
  }

  // @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
  module.exports.getById = async function (req: any, res: any) {
    try {
      const news = await News.findOne({ _id: req.params.id })
      res.status(200).json(news)
    } catch (e) {
      handleError(res, e)
    }
  }

  // @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
  module.exports.create = async function (req: any, res: any) {
    const news = new News({
      title: req.body.title,
      description: req.body.description,
      short_description: req.body.short_description,
      create_at: req.body.create_at,
      imageSrc: req.file ? req.file.path : ''
    })

    try {
      await news.save()
      res.status(201).json(news)
    } catch (e) {
      handleError(res, e)
    }
  }

  // @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
  module.exports.update = async function (req: any, res: any) {
    const updated = {
      title: req.body.title,
      description: req.body.description,
      short_description: req.body.short_description
    }

    if (req.file) {
      // @ts-expect-error TS(2339): Property 'imageSrc' does not exist on type '{ titl... Remove this comment to see the full error message
      updated.imageSrc = req.file.path
    }

    try {
      const news = await News.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updated },
        { new: true }
      )

      res.status(200).json(news)
    } catch (e) {
      handleError(res, e)
    }
  }

  // @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
  module.exports.delete = async function (req: any, res: any) {
    try {
      await News.remove({ _id: req.params.id })
      res.status(200).json({
        message: 'Новость успешно удалена.'
      })
    } catch (e) {
      handleError(res, e)
    }
  }
  const news = new News({
    title: req.body.title,
    description: req.body.description,
    short_description: req.body.short_description,
    create_at: req.body.create_at,
    imageSrc: req.file ? req.file.path : ''
  })

  try {
    await news.save()
    res.status(201).json(news)
  } catch (e) {
    handleError(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.update = async function (req: any, res: any) {
  const updated = {
    title: req.body.title,
    description: req.body.description,
    short_description: req.body.short_description
  }

  if (req.file) {
    // @ts-expect-error TS(2339): Property 'imageSrc' does not exist on type '{ titl... Remove this comment to see the full error message
    updated.imageSrc = req.file.path
  }

  try {
    const news = await News.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updated },
      { new: true }
    )

    res.status(200).json(news)
  } catch (e) {
    handleError(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.delete = async function (req: any, res: any) {
  try {
    await News.remove({ _id: req.params.id })
    res.status(200).json({
      message: 'Новость успешно удалена.'
    })
  } catch (e) {
    handleError(res, e)
  }
}
