import React, { useState } from 'react'
import { useDelivery, useDeliveryActions, useOrderedDishes } from '../../../redux/hooks/bucket.hooks'
import { dishType } from '../../../types/types'

const useButtonBucketLogic = () => {
  const [moreInfo, setMoreInfo] = useState(false)

  const toggle = () => setMoreInfo(!moreInfo)
  const close = () => setMoreInfo(false)

  return { moreInfo, toggle, close }
}

export const useButtonBucketCounterLogic = () => {
  const { order } = useDelivery()

  const orderPositionsCount = order.reduce((acc, order) => acc + order.count, 0)
  const count = orderPositionsCount > 100 ? '99+' : orderPositionsCount

  return { order, count }
}

export const useBucketInfoWrapperLogic = () => {
  const isBucketEmpty = Boolean(useOrderedDishes().length)

  return { isBucketEmpty }
}

export const useBucketInfoContentLogic = () => {
  const { order } = useDelivery()
  const orderedDished = useOrderedDishes()
  const { increaseDishCount, reduceDishCount, changeDishCount, removeDish } = useDeliveryActions()

  const onChange = (dish: dishType) => ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    changeDishCount(dish, Number(value))
  }


  return { order, orderedDished, increaseDishCount, reduceDishCount, changeDishCount: onChange, removeDish }
}

export const useBucketInfoFooterLogic = () => {
  const { order } = useDelivery()
  const totalPrice = order.reduce((acc, order) => acc + order.cost * order.count, 0)

  return { totalPrice }
}

export default useButtonBucketLogic