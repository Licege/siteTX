import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCategories, getCurrentCategory, getCurrentDish, getMenu } from '../getters/menu.getters'
import { requestCategories, requestCategory, requestDish, requestDishes } from '../thunks/menu.thunks'

export const useDishes = ({ force = false } = {}) => {
  const dispatch = useDispatch()
  const dishes = useSelector(getMenu)

  useEffect(() => {
    if (!dishes.length || force) {
      dispatch(requestDishes())
    }
  }, [])

  return dishes
}

export const useCurrentDish = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(requestDish(id))
  }, [id])

  return useSelector(getCurrentDish)
}

export const useCategories = ({ force = false } = {}) => {
  const dispatch = useDispatch()
  const categories = useSelector(getCategories)

  useEffect(() => {
    dispatch(requestCategories())
  }, [])

  return categories
}

export const useCurrentCategory = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestCategory(id))
  }, [id])

  return useSelector(getCurrentCategory)
}