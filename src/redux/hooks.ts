import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from './redux-store'
import { requestCategories, requestDishById, requestDishes, requestDishesByCategoryId } from './thunks/menu.thunk'
import { getAllCategories, getAllDishes, getCurrentDish } from './getters/menu.getters'

type idParam = {
  id: string
}

type categoryIdParam = {
  categoryId: string
}

export const useAllDishes = () => {
  const { categoryId } = useParams<categoryIdParam>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (categoryId) {
      dispatch(requestDishesByCategoryId(categoryId))
    } else {
      dispatch(requestDishes)
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

export const useAllCategories = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(requestCategories())
  }, [])

  return useSelector(getAllCategories)
}