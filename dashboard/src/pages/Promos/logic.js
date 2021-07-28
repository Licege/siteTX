import { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { useFileLogic } from '../../hooks'
import {requestAllPromos, requestPromoById, postPromo, updatePromo, removePromo} from '../../redux/thunks/promos.thunks'
import {getAllPromos, getCurrentPromo} from '../../redux/getters/promos.getters'

const usePromos = ({ force = false } = {}) => {
  const dispatch = useDispatch()
  const promos = useSelector(getAllPromos)

  useEffect(() => {
    if (!promos.length || force)
    dispatch(requestAllPromos())
  }, [])

  return promos
}

export const useCurrentPromo = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(requestPromoById(id))
  }, [])

  return useSelector(getCurrentPromo)
}

export const usePromoHeaderLogic = () => {
  const history = useHistory()

  const redirectToCreatePromo = () => {
    history.push(`promos/new`)
  }

  return { redirectToCreatePromo }
}

export const usePromosCardsLogic = () => {
  const dispatch = useDispatch()
  const promos = usePromos()

  const onDelete = useCallback(id => {
    dispatch(removePromo(id))
  }, [])

  return { promos, onDelete }
}

export const useCreatePromoLogic = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [description, setDescription] = useState('')
  const { file, uploadFile, createFormDataWithFile } = useFileLogic()

  const changeDescription = newDescription => setDescription(newDescription)

  const createPromo = newPromo => {
    const formData = createFormDataWithFile(newPromo, 'image')
    if (description) formData.append('description', description)

    dispatch(postPromo(formData))

    history.push('/promos')
  }

  const cancel = () => {
    history.push('/promos')
  }

  return { changeDescription, uploadFile, createPromo, cancel }
}

export const useEditPromoLogic = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const promo = useCurrentPromo()
  const [description, setDescription] = useState(promo.description)
  const { file, uploadFile, createFormDataWithFile } = useFileLogic()

  const changeDescription = newDescription => setDescription(newDescription)

  const editPromo = newPromo => {
    const formData = createFormDataWithFile(newPromo, 'image')
    if (description) formData.set('description', description)

    dispatch(updatePromo({ promo: formData, id: formData.get('id') }))

    history.push('/promos')
  }

  const cancel = () => {
    history.push('/promos')
  }

  return { promo, editPromo, cancel, changeDescription, uploadFile }
}

export const useShowPromoLogic = () => {
  const history = useHistory()
  const { id } = useParams()

  const promo = useCurrentPromo()

  const redirectToChangePromo = () => {
    history.push(`/promos/edit/${id}`)
  }

  const goBack = () => {
    history.push('/promos')
  }

  return { promo, redirectToChangePromo, goBack }
}