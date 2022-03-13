import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import {
  createDish as createDishThunk,
  deleteDish,
  updateDish
} from '../../redux/thunks/menu.thunks'
import {showModal} from '../../redux/reducers/modals.reducer'
import {useCategories, useCurrentDish, useDishes} from '../../redux/hooks/menu.hooks'
import {toSelectValue} from '../../components/Form/utils';

export const useMenuLogic = () => {
  const history = useHistory()
  const redirectToCreateDish = () => history.push('menu/new')

  const onUploadPDFMenu = ({target}) => {
    if (target.files.length) console.log(target.files[0])
  }

  return {redirectToCreateDish, onUploadPDFMenu}
}

export const useMenuCardsLogic = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const dishes = useDishes()
  const categories = useCategories()

  const redirectToEditDish = id => () => history.push(`menu/edit/${id}`)

  const onRemove = id => () => dispatch(deleteDish(id))

  const openDelModal = id => () => dispatch(showModal({name: 'SIMPLE_DELETE', props: {title: 'блюдо', onRemove: onRemove(id)}}))

  return {
    dishes,
    categories,
    redirectToEditDish,
    openDelModal
  }
}

export const useCreateDishLogic = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [file, setFile] = useState('')
  const categories = useCategories()

  const uploadFile = file => setFile(file)

  const createDish = dish => {
    let formData = new FormData()
    for (const key in dish) {
      if (dish.hasOwnProperty(key)) {
        if (key === 'categoryId') {
          formData.append(key, dish[key].value)
          continue;
        }

        formData.append(key, dish[key])
      }
    }
    formData.weight = parseInt(formData.weight, 10)
    formData.price = parseInt(formData.price, 10)
    formData.append('image', file)
    dispatch(createDishThunk(formData))
    history.push('/menu')
  }

  const cancel = () => {
    history.push('/menu')
  }

  return {categories, createDish, uploadFile, cancel}
}

function generateInitialDish(dish, categories = []) {
  return {
    ...dish,
    categoryId: toSelectValue(categories, dish.categoryId, {keyLabel: 'title'})
  }
}

export const useEditDishLogic = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const {id} = useParams()

  const [file, setFile] = useState('')
  const dish = useCurrentDish()
  const categories = useCategories()

  const onRemove = () => dispatch(deleteDish(id))

  const openDelModal = () => dispatch(showModal({name: 'SIMPLE_DELETE', props: {title: 'блюдо', onRemove}}))

  const uploadFile = file => setFile(file)

  const editDish = dish => {
    const formData = new FormData()
    for (const key in dish) {
      if (dish.hasOwnProperty(key)) formData.append(key, dish[key])
    }
    formData.append('image', file)
    dispatch(updateDish({dish: formData, id: dish.id}))
    history.push('/menu')
  }

  const cancel = () => {
    history.push('/menu')
  }

  return {
    dish: generateInitialDish(dish, categories),
    categories,
    editDish,
    cancel,
    openDelModal,
    uploadFile
  }
}