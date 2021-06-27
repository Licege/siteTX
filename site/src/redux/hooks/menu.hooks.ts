import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../redux-store'
import { requestCategories, requestDishById, requestDishes, requestDishesByCategoryId } from '../thunks/menu.thunk'
import { getAllCategories, getAllDishes, getCurrentDish } from '../getters/menu.getters'
import { dishType } from '../../types/types'
import * as bucketActions from '../reducers/bucket.reducer'

type IdParam = {
  id: string
}

type CategoryIdParam = {
  categoryId: string
}

export const useDishes = ({ force = false } = {}) => {
  const dispatch = useAppDispatch()
  const dishes = useSelector(getAllDishes)

  useEffect(() => {
    if (!dishes?.length || force) {
      dispatch(requestDishes())
    }
  }, [])

  return dishes
}

export const useDishesByCategoryId = () => {
  const { categoryId } = useParams<CategoryIdParam>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (categoryId) {
      dispatch(requestDishesByCategoryId(categoryId))
    } else {
      dispatch(requestDishes())
    }
  }, [categoryId, dispatch])

  return useSelector(getAllDishes)
}

export const useCurrentDish = () => {
  const { id } = useParams<IdParam>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(requestDishById(+id))
  }, [dispatch, id])

  return useSelector(getCurrentDish)
}

export const useCategories = ({ force = false } = {}) => {
  const dispatch = useAppDispatch()
  const categories = useSelector(getAllCategories)

  useEffect(() => {
    if (!categories.length || force) {
      dispatch(requestCategories())
    }
  }, [])

  return categories
}

export const useRequestCategories = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(requestCategories())
  }, [dispatch])

  return useSelector(getAllCategories)
}

export const useMenuActions = () => {
  const dispatch = useAppDispatch()

  const addDishToBucket = useCallback((dish: dishType) => {
    dispatch(bucketActions.addDish(dish))
  }, [dispatch])

  const increaseCountDish = useCallback((dish: dishType) => {
    dispatch(bucketActions.increaseDishCount(dish))
  }, [dispatch])

  const reduceCountDish = useCallback((dish: dishType) => {
    dispatch(bucketActions.reduceDishCount(dish))
  }, [dispatch])

  const removeDish = useCallback((id: number) => {
    dispatch(bucketActions.removeDish(id))
  }, [dispatch])

  return { addDishToBucket, increaseCountDish, reduceCountDish, removeDish }
}