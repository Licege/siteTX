import { useState } from 'react'
import { useDelivery, useDeliverySettings } from '../../redux/hooks/bucket.hooks'


export const useBucketPageLogic = () => {
  document.title = 'Оформление заказа'
  window.scrollTo(0, 0)

  useDeliverySettings()
  const delivery = useDelivery()
  const [step, setStep] = useState<0|1|2>(0);

  const haveOrder = Boolean(delivery.order.length)

  return { haveOrder, step, setStep }
}