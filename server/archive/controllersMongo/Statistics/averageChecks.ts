// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Delivery'.
const Delivery = require('../../modelsMongo/delivery/Delivery')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../../src/utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.get = async function (req: any, res: any) {
  const query = {
    payment_status: 1,
    status: 3
  }

  if (req.query.create_at_start) {
    // @ts-expect-error TS(2339): Property 'create_at' does not exist on type '{ pay... Remove this comment to see the full error message
    query.create_at = {
      $gte: req.query.create_at_start
    }
  }
  if (req.query.create_at_end) {
    // @ts-expect-error TS(2339): Property 'create_at' does not exist on type '{ pay... Remove this comment to see the full error message
    if (!query.create_at) {
      // @ts-expect-error TS(2339): Property 'create_at' does not exist on type '{ pay... Remove this comment to see the full error message
      query.create_at = {}
    }
    // @ts-expect-error TS(2339): Property 'create_at' does not exist on type '{ pay... Remove this comment to see the full error message
    query.create_at['$lte'] = req.query.create_at_end
  }

  console.log(query)

  try {
    const avg = await Delivery.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$payment_type',
          avg_delivery_check: { $avg: '$total_price' },
          count: { $sum: 1 }
        }
      }
    ])

    res.status(200).json(avg)
  } catch (e) {
    errorHandler(res, e)
  }
}
