import {useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {createCategory, deleteCategory, updateCategory} from '../../redux/thunks/menu.thunks'
import {useCategories, useCurrentCategory} from '../../redux/hooks/menu.hooks'

const validate = values => {
  const errors = {}
  const requiredField = [
    'title',
    'titleEn',
  ]

  requiredField.forEach(field => {
    if (!values[field]) errors[field] = 'Заполните это поле'
  })

  return errors
}

export const useCategoriesHeaderLogic = () => {
  const history = useHistory()

  const redirectToCreateCategory = useCallback(() => history.push('categories/new'), [])

  return {redirectToCreateCategory}
}

export const useCategoriesTableLogic = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const categories = useCategories()

  const updateCategory = useCallback(id => () => history.push(`categories/edit/${id}`), [])
  const removeCategory = useCallback(id => event => {
    event.stopPropagation()
    dispatch(deleteCategory(id))
  }, [])

  return {categories, updateCategory, removeCategory}
}

export const useCreateCategoryLogic = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const createNewCategory = useCallback(category => {
    dispatch(createCategory(category))
    history.push('/categories')
  }, [])

  const cancel = useCallback(() => history.push('/categories'), [])

  return {createNewCategory, cancel, validate}
}

export const useEditCategoryLogic = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const category = useCurrentCategory()

  const editCategory = useCallback(category => {
    dispatch(updateCategory(category))
    history.push('/categories')
  }, [])

  const cancel = useCallback(() => history.push('/categories'), [])

  return {category, editCategory, cancel, validate}
}