// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const Profile = require('../modelsMongo/User')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Delivery'.
const Delivery = require('../modelsMongo/delivery/Delivery')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../src/utils/errorHandler')

const parsedProfile = (data: any) => {
  const { password, _id, __v, reg_date, imageSrc, ...rest } = data._doc

  const fields = Object.keys(rest).reduce(
    (acc, key) => ({ ...acc, [key]: rest[key] }),
    {}
  )

  return {
    id: _id,
    ...fields,
    regDate: reg_date,
    avatar: imageSrc
  }
}

const parsedDeliveryOrders = (data: any) => {
  return data.map((order: any) => {
    const { __v, _id, ...rest } = order._doc

    return {
      id: _id,
      ...rest
    }
  });
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getMe = async function (req: any, res: any) {
  try {
    const me = await Profile.findOne({ _id: req.user })
    res.status(200).json(parsedProfile(me))
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getMyOrders = async function (req: any, res: any) {
  try {
    const deliveryOrders = await Delivery.find({ user_id: req.user })
    res.status(200).json(parsedDeliveryOrders(deliveryOrders))
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.updateMe = async function (req: any, res: any) {
  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { _id: req.user },
      { $set: req.body },
      { new: true }
    )
    return res.status(200).json(updatedProfile)
  } catch (e) {
    errorHandler(res, e)
  }
}
