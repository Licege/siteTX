import { useCallback } from 'react'
import { useAppDispatch } from '../../../redux/redux-store'
import * as bucketActions from '../../../redux/reducers/bucket.reducer'
import { dishType } from '../../../types/types'
import { useCategories, useRequestDishes } from '../../../redux/hooks/menu.hooks'

export const useSliderDishesLogic = () => {
  const dispatch = useAppDispatch()
  const dishes = useRequestDishes()
  const categories = useCategories()

  const addDishToBucket = useCallback((dish: dishType) => {
    dispatch(bucketActions.addDish(dish))
  }, [])

  return { dishes, categories, addDishToBucket }
}