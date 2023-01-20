// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const Reviews = require('../modelsMongo/Reviews')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../src/utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getAll = async function (req: any, res: any) {
  try {
    const query = {}

    if (req.query.create_at_start) {
      // @ts-expect-error TS(2339): Property 'create_at' does not exist on type '{}'.
      query.create_at = {
        $gte: req.query.create_at_start
      }
    }
    if (req.query.create_at_end) {
      if (!req.query.create_at_start) {
        // @ts-expect-error TS(2339): Property 'create_at' does not exist on type '{}'.
        query.create_at = {}
      }
      // @ts-expect-error TS(2339): Property 'create_at' does not exist on type '{}'.
      query.create_at[$lte] = req.query.create_at_end
    }
    if (req.query.status) {
      // @ts-expect-error TS(2339): Property 'status' does not exist on type '{}'.
      query.status = req.query.status
    }
    if (req.query.rating) {
      // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
      query.rating = req.query.rating
    }

    const reviews = await Reviews.find(query)
      .sort({ create_at: -1 })
      .skip(+req.query.offset)
      .limit(+req.query.limit)
      .populate('user')
    res.status(200).json(reviews)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.publicGetAll = async function (req: any, res: any) {
  try {
    const reviews = await Reviews.find({ status: 1 })
      .skip(+req.query.offset)
      .limit(+req.query.limit)
      .populate('user')
    res.status(200).json(reviews)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getById = async function (req: any, res: any) {
  try {
    const review = await Reviews.findOne({ _id: req.params.id }).populate(
      'user'
    )
    res.status(200).json(review)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.create = async function (req: any, res: any) {
  try {
    const reviews = await Reviews.find().populate('user')

    if (hasReview(req.user, reviews)) {
      console.log('д1а')
    }
    const review = await new Reviews({
      user: req.user,
      rating: req.body.rating,
      description: req.body.description,
      create_at: req.body.create_at,
      imageSrc: req.file ? req.file.path : ''
    }).save()
    res.status(200).json(review)
  } catch (e) {
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
  const updated = {
    rating: req.body.rating,
    description: req.body.description,
    create_at: req.body.create_at,
    status: req.body.status
  }
  if (req.file) {
    // @ts-expect-error TS(2339): Property 'imageSrc' does not exist on type '{ rati... Remove this comment to see the full error message
    updated.imageSrc = req.file.path
  }
  try {
    const review = await Reviews.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updated },
      { new: true }
    ).populate('user')
    res.status(200).json(review)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.remove = async function (req: any, res: any) {
  try {
    await Reviews.remove({ _id: req.params.id })
  } catch (e) {
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
