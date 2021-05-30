import {useCallback, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {hideModal} from '../../../redux/reducers/modals.reducer'
import {useRequestDeliveryCommonSettings} from '../../../redux/hooks/hooks'
import {addDishToOrder} from '../../../redux/reducers/delivery.reducer'
import {requestDishesByCategory} from '../../../redux/thunks/menu.thunks'
import { useCategories, useDishes } from '../../../redux/hooks/menu.hooks'

const useFilterDishesByCategory = () => {
  const dispatch = useDispatch()
  const [category, setCategory] = useState('')

  useEffect(() => {
    if (!category) {
      dispatch(requestDishesByCategory(category))
    }
  }, [category])

  return { category, setCategory }
}

export const useModalMenuLogic = () => {
  const dispatch = useDispatch()

  useRequestDeliveryCommonSettings()
  const dishes = useDishes()
  const categories = useCategories()

  const { currentCategory, setCurrentCategory } = useFilterDishesByCategory()

  const addDish = useCallback(dish => () => { dispatch(addDishToOrder(dish)) }, [])

  const changeCurrentCategory = newCurrentCategory => setCurrentCategory(newCurrentCategory)

  const onHide = () => dispatch(hideModal())

  return { dishes, categories, addDish, currentCategory, changeCurrentCategory, onHide }
}