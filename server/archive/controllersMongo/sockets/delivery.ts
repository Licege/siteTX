// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Dishes'.
const Dishes = require('../../modelsMongo/Menu')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Delivery'.
const Delivery = require('../../modelsMongo/delivery/Delivery')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'GlobalSett... Remove this comment to see the full error message
const GlobalSettings = require('../../modelsMongo/delivery/GlobalSettings')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Settings'.
const Settings = require('../../modelsMongo/delivery/CommonSettings')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.createDeliveryController = async function (data: any) {
  try {
    //валидация
    const globalSettings = await GlobalSettings.findOne()

    if (data.delivery_type === 'home') {
      const settings = await Settings.findOne({ city: data.address.city })
      if (!settings) {
        return { status: 400, message: 'Невалидные данные!' }
      } else if (
        settings.free_delivery > data.total_price &&
        settings.price_for_delivery !== data.delivery_cost
      ) {
        return { status: 400, message: 'Невалидные данные!' }
      } else if (
        settings.free_delivery <= data.total_price &&
        data.delivery_cost !== 0
      ) {
        return { status: 400, message: 'Невалидные данные!' }
      }
    } else if (data.delivery_type === 'restaurant') {
      if (data.sale_for_pickup !== globalSettings.sale_for_pickup) {
        return { status: 400, message: 'Невалидные данные!' }
      }
    }

    const dishes = await Dishes.find()
    let countItem = 0
    let totalPrice = 0
    for (let i = 0; i < data.list.length; i++) {
      let dish = dishes.find(
        (dish: any) => dish._id.toString() === data.list[i].dish_id
      )
      if (data.list[i].cost !== dish.cost) {
        return { status: 400, message: 'Невалидные данные!' }
      }
      totalPrice = totalPrice + dish.cost * data.list[i].count
      countItem++
    }
    if (data.total_price !== totalPrice || data.list.length !== countItem) {
      return { status: 400, message: 'Невалидные данные!' }
    }
    console.log(data)

    const result = await new Delivery(data).save()

    return { status: 201, data: result }
  } catch (e) {
    return e
  }
}
