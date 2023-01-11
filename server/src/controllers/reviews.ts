// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sequelize'... Remove this comment to see the full error message
const { sequelize, User } = require('../models').init()
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const ReviewsRepo = require('../repositories/review')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getAll = async function (req: any, res: any) {
  try {
    const where = {}

    if (req.query.createdAtStart) {
      // @ts-expect-error TS(2339): Property 'createdAt' does not exist on type '{}'.
      where.createdAt = {
        $gte: req.query.createdAtStart
      }
    }
    if (req.query.createdAtEnd) {
      if (!req.query.createAtStart) {
        // @ts-expect-error TS(2339): Property 'createdAt' does not exist on type '{}'.
        where.createdAt = {}
      }
      // @ts-expect-error TS(2339): Property 'createdAt' does not exist on type '{}'.
      where.createdAt[$lte] = req.query.createdAtEnd
    }
    if (req.query.status) {
      // @ts-expect-error TS(2339): Property 'status' does not exist on type '{}'.
      where.status = req.query.status
    }
    if (req.query.rating) {
      // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
      where.rating = req.query.rating
    }

    const include = [
      {
        model: User,
        attributes: []
      }
    ]

    const reviews = await ReviewsRepo.all(where, {
      include,
      limit: +req.query.limit || 0,
      offset: +req.query.offset || 0,
      order: [
        ['updatedAt', 'DESC'],
        ['createdAt', 'DESC']
      ]
    })

    res.status(200).json(reviews)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.publicGetAll = async function (req: any, res: any) {
  try {
    const where = { status: 1 }

    const include = [
      {
        model: User,
        attributes: []
      }
    ]

    const reviews = await ReviewsRepo.all(where, {
      include,
      limit: +req.query.limit,
      offset: +req.query.offset
    })

    res.status(200).json(reviews)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getById = async function (req: any, res: any) {
  try {
    const include = [
      {
        model: User,
        attributes: []
      }
    ]

    const review = await ReviewsRepo.findById(req.params.id)

    res.status(200).json(review)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.create = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  try {
    // const reviews = await Reviews
    //     .find()
    //     .populate('user')
    //
    // if (hasReview(req.user, reviews)) {
    //     console.log('д1а')
    // }
    const reviewToCreate = {
      user: req.user,
      rating: req.body.rating,
      description: req.body.description,
      imageSrc: req.file ? req.file.path : ''
    }

    const review = await ReviewsRepo.create(reviewToCreate, transaction)
    await transaction.commit()
    res.status(200).json(review)
  } catch (e) {
    await transaction.rollback()
    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    if (e.code === 11000) {
      res.status(400).json({ message: 'Отзыв уже был оставлен!' })
    } else {
      errorHandler(res, e)
    }
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.update = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  const reviewToUpdate = {
    rating: req.body.rating,
    description: req.body.description,
    status: req.body.status
  }
  if (req.file) {
    // @ts-expect-error TS(2339): Property 'imageSrc' does not exist on type '{ rati... Remove this comment to see the full error message
    reviewToUpdate.imageSrc = req.file.path
  }
  try {
    const where = { id: req.params.id }
    const review = await ReviewsRepo.update(where, reviewToUpdate, transaction)
    await transaction.commit()
    res.status(200).json(review)
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.remove = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  try {
    await ReviewsRepo.destroyById(req.params.id, transaction)
    await transaction.commit()
    res.status(204).send()
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}

// status
// 0 - Неодобрен
// 1 - Одобрен
// 2 - Отклонен
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'hasReview'... Remove this comment to see the full error message
const hasReview = (userId: any, reviews: any) => {
  const review = reviews.filter((r: any) => r.user._id.toString() === userId)[0]

  if (review && review.length) {
    console.log('отзыв ', !(review.status === 0 || review.status === 1))
    return !(review.status === 0 || review.status === 1)
  }

  return false
}
