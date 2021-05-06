import React from 'react'
import { useDishes } from '../../../redux/hooks/menu.hooks'
import { useDelivery, useDeliveryActions, useOrderedDishes } from '../../../redux/hooks/bucket.hooks'
import { dishType } from '../../../types/types'

export const useBucketShowOrderPageLogic = () => {
  document.title = 'Оформление заказа'
  window.scrollTo(0, 0)
  const dishes = useDishes()

  return { dishes }
}

export const useBucketOrderTableLogic = () => {
  const { order } = useDelivery()
  const dishes = useOrderedDishes()

  const { increaseDishCount, reduceDishCount, changeDishCount, removeDish } = useDeliveryActions()

  const onChange = (dish: dishType) => ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    changeDishCount(dish, Number(value))
  }

  return { dishes, order, increaseDishCount, reduceDishCount, changeDishCount: onChange, removeDish }
}

export const useBucketOrderTableActionsLogic = () => {
  const { clearBucket } = useDeliveryActions()

  return { clearBucket }
}

export const useBucketOrderTableFooterLogic = () => {
  const { totalPrice } = useDelivery()

  return { totalPrice }
}