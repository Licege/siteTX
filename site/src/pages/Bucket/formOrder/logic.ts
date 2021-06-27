import { useMemo } from 'react'
import { useFormState } from 'react-final-form'
import {
  useDelivery,
  useDeliverySettings,
  useGlobalDeliverySettings,
  // usePostOrder
} from '../../../redux/hooks/bucket.hooks'
import { deliverySettingsType, IDeliveryPost, profileType } from '../../../types/types'
import { getFullName } from '../../../plugins/helpers'
import { useMe } from '../../../redux/hooks/profile.hooks'


interface IDataFromProfile {
  name?: string
  phone?: string
  email?: string
}

interface IInitialValues extends IDataFromProfile {
  paymentType: string
  deliveryType: string
  address: {
    city: number
  }
  timeDelivery: Date
}

const defaultTimeDelivery = new Date(new Date().setMilliseconds(60 * 60 * 1000))

const getDataFromProfile = (me: profileType): IDataFromProfile => {
  if (!me || !Object.keys(me).length) return {}
  const { surname, forename, patronymic, phone, email } = me

  return {
    name: getFullName({ surname, forename, patronymic }),
    phone,
    email
  }
}

const getInitialValues = (me: profileType): IInitialValues => {
  const initialValues = {
    paymentType: 'cash',
    deliveryType: 'home',
    address: {
      city: 1,
    },
    timeDelivery: defaultTimeDelivery,
  }

  return { ...getDataFromProfile(me), ...initialValues }
}

export const useBucketFormOrderLogic = () => {
  document.title = 'Оформление заказа'
  window.scrollTo(0, 0)

  const me = useMe()
  const delivery = useDelivery()
  const settings = useDeliverySettings()
  const globalSettings = useGlobalDeliverySettings()
  // const postOrder = usePostOrder()

  const cityOptions = settings.reduce((acc: any, s) => s.isDelivery ? [...acc, { value: s.id, label: s.city }] : acc, [])

  const onSubmit = (data: IDeliveryPost) => {
    const { deliveryType, address } = data

    const postData = {
      ...data,
      list: delivery.order,
      deliveryCost: calcDeliveryPrice({ settings, deliveryType, address, deliveryTotalPrice: delivery.totalPrice }),
      sale: calcSale({ deliveryType, saleForPickup: globalSettings.saleForPickup }),
      totalPrice: delivery.totalPrice,
      userId: me?.id || null,
    }
    console.log(postData)
    // postOrder(postData)
    // this.context.sendOrderDelivery(post)
  }

  const initialValues = useMemo<IInitialValues>(() => getInitialValues(me), [me])

  return { initialValues, onSubmit, globalSettings, cityOptions }
}

export const useBucketInfoBlockLogic = () => {
  const delivery = useDelivery()
  const settings = useDeliverySettings()
  const globalSettings = useGlobalDeliverySettings()
  const { values } = useFormState()
  const { deliveryType, address } = values

  const showInfo = Boolean(delivery.order.length)

  const deliveryPrice = calcDeliveryPrice({ settings, deliveryType, address, deliveryTotalPrice: delivery.totalPrice })

  const calcPrice = () => {
    const saleForPickup = deliveryType === 'restaurant' ? globalSettings.saleForPickup : 0
    const sale = (delivery.totalPrice + deliveryPrice) * saleForPickup / 100
    const price = delivery.totalPrice + deliveryPrice - sale

    return { sale, price, saleForPickup }
  }

  const { sale, price, saleForPickup } = calcPrice()

  return { showInfo, sale, price, saleForPickup, totalPrice: delivery.totalPrice, deliveryPrice }
}

interface ICalcDeliveryPrice {
  deliveryType: any,
  address: any,
  settings: deliverySettingsType[],
  deliveryTotalPrice: number
}

function calcDeliveryPrice ({ deliveryType, settings, address, deliveryTotalPrice }: ICalcDeliveryPrice) {
  if (deliveryType === 'restaurant') return 0
  const currentCitySettings = settings.find(s => s.id === address.city)

  if (!currentCitySettings) throw new Error(`Not found delivery settings for city ${address.city}`)

  if (currentCitySettings.freeDelivery < deliveryTotalPrice) return 0

  return currentCitySettings.priceForDelivery
}

interface ICalcSale {
  deliveryType: any
  saleForPickup: number
}

function calcSale({ deliveryType, saleForPickup }: ICalcSale) {
  return deliveryType === 'restaurant' ? saleForPickup : 0
}