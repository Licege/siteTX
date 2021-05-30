import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../redux-store'
import { getCurrentPromo, getPromos } from '../getters/promos.getters'
import { requestPromoById, requestPromos } from '../thunks/promos.thunk'

type IdParam = {
  id: string
}

export const usePromos = ({ force = false } = {}) => {
  const dispatch = useAppDispatch()
  const promos = useSelector(getPromos)

  useEffect(() => {
    if (!promos.length || force) {
      dispatch(requestPromos())
    }
  }, [])

  return promos
}

export const usePromo = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams<IdParam>()

  useEffect(() => {
    dispatch(requestPromoById(id))
  }, [])

  return useSelector(getCurrentPromo)
}