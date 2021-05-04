import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../redux-store'
import { requestCategories, requestDishById, requestDishes, requestDishesByCategoryId } from '../thunks/menu.thunk'
import { getAllCategories, getAllDishes, getCurrentDish } from '../getters/menu.getters'
import { dishType } from '../../types/types'
import * as bucketActions from '../reducers/bucket.reducer'

type idParam = {
  id: string
}

type categoryIdParam = {
  categoryId: string
}

export const useDishes = () => {
  const dispatch = useAppDispatch()
  const dishes = useSelector(getAllDishes)

  useEffect(() => {
    if (!dishes?.length) {
      dispatch(requestDishes())
    }
  }, [])

  return dishes
}

export const useRequestDishes = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(requestDishes())
  }, [])

  return useSelector(getAllDishes)
}

export const useRequestDishesByCategoryId = () => {
  const { categoryId } = useParams<categoryIdParam>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (categoryId) {
      dispatch(requestDishesByCategoryId(categoryId))
    } else {
      dispatch(requestDishes())
    }
  }, [categoryId])

  return useSelector(getAllDishes)
}

export const useCurrentDish = () => {
  const { id } = useParams<idParam>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(requestDishById(+id))
  }, [])

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
  }, [])

  return useSelector(getAllCategories)
}

export const useMenuActions = () => {
  const dispatch = useAppDispatch()

  const addDishToBucket = useCallback((dish: dishType) => {
    dispatch(bucketActions.addDish(dish))
  }, [])

  const increaseCountDish = useCallback((dish: dishType) => {
    dispatch(bucketActions.increaseDishCount(dish))
  }, [])

  const reduceCountDish = useCallback((dish: dishType) => {
    dispatch(bucketActions.reduceDishCount(dish))
  }, [])

  const removeDish = useCallback((id: number) => {
    dispatch(bucketActions.removeDish(id))
  }, [])

  return { addDishToBucket, increaseCountDish, reduceCountDish, removeDish }
}