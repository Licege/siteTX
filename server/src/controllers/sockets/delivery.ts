// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sequelize'... Remove this comment to see the full error message
const { sequelize } = require('../../models').init()
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'DishRepo'.
const DishRepo = require('../../repositories/dish')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'DeliveryRe... Remove this comment to see the full error message
const DeliveryRepo = require('../../repositories/delivery')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'GlobalSett... Remove this comment to see the full error message
const GlobalSettingsRepo = require('../../repositories/deliveryGlobalSettings')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const SettingsRepo = require('../../repositories/deliveryCommonSettings')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.createDeliveryController = async function (data: any) {
  const transaction = await sequelize.transaction()

  try {
    console.log(data)
    const globalSettings = await GlobalSettingsRepo.one({})

    if (data.deliveryType === 'home') {
      const settings = await SettingsRepo.one({ city: data.address.city })
      if (!settings) {
        return { status: 400, message: 'Невалидные данные!' }
      } else if (
        settings.freeDelivery > data.totalPrice &&
        settings.priceForDelivery !== data.deliveryCost
      ) {
        return { status: 400, message: 'Невалидные данные!' }
      } else if (
        settings.freeDelivery <= data.totalPrice &&
        data.deliveryCost !== 0
      ) {
        return { status: 400, message: 'Невалидные данные!' }
      }
    } else if (data.deliveryType === 'restaurant') {
      if (data.saleForPickup !== globalSettings.saleForPickup) {
        return { status: 400, message: 'Невалидные данные!' }
      }
    }

    const ids = data.list.map(({
      dishId
    }: any) => dishId)
    const where = { id: ids }
    const dishes = await DishRepo.all(where)
    let countItem = 0
    let totalPrice = 0
    for (let i = 0; i < data.list.length; i++) {
      let dish = dishes.find((dish: any) => dish.id === data.list[i].dishId)
      if (data.list[i].cost !== dish.cost) {
        return { status: 400, message: 'Невалидные данные!' }
      }
      totalPrice = totalPrice + dish.cost * data.list[i].count
      countItem++
    }
    if (data.totalPrice !== totalPrice || data.list.length !== countItem) {
      return { status: 400, message: 'Невалидные данные!' }
    }

    const {
      email,
      name,
      phone,
      oddMoney = 0,
      timeDelivery,
      countPerson = 1,
      address,
      comment = '',
      list,
      deliveryCost,
      sale,
      totalPrice: price,
      deliveryType,
      paymentType,
      createdAt,
      updatedAt,
      userId
    } = data

    const orderToAdd = {
      name,
      phone,
      email,
      paymentType,
      deliveryType,
      address,
      oddMoney,
      timeDelivery,
      countPerson,
      comment,
      paymentStatus: 0,
      status: 0,
      list,
      deliveryCost,
      sale,
      price,
      createdAt,
      updatedAt,
      userId
    }

    const result = await DeliveryRepo.create(orderToAdd, transaction)
    await transaction.commit()
    return { status: 201, data: result }
  } catch (e) {
    await transaction.rollback()
    return e
  }
}
