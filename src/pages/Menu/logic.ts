import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../redux/redux-store'
import { useAllCategories, useAllDishes } from '../../redux/hooks'

import * as bucketActions from '../../redux/reducers/bucket.reducer'
import { dishType } from '../../types/types'
import { getDeliveryOrder } from '../../redux/getters/bucket.getters'
import { getIsPhone } from '../../redux/getters/app.getters'

export const useMenuLogic = () => {
  document.title = 'Меню'
  window.scrollTo(0, 0)
}

export const useMenuCardsLogic = () => {
  const dispatch = useAppDispatch()

  const dishes = useAllDishes()
  const { order } = useSelector(getDeliveryOrder)
  const isPhone = useSelector(getIsPhone)
  const categories = useSelector(useAllCategories)

  const addDishToBucket = useCallback((dish: dishType) => {
    dispatch(bucketActions.addDish(dish))
  }, [])

  const increaseCountDish = useCallback((dish: dishType) => {
    dispatch(bucketActions.increaseDishCount(dish))
  }, [])

  const reduceCountDish = useCallback((dish: dishType) => {
    dispatch(bucketActions.reduceDishCount(dish))
  }, [])

  return { dishes, order, isPhone, addDishToBucket, increaseCountDish, reduceCountDish }
}