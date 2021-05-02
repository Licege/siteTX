import { useAppDispatch } from '../redux-store'
import { useSelector } from 'react-redux'
import { getPromos } from '../getters/promos.getters'
import { useEffect } from 'react'
import { requestPromos } from '../thunks/promos.thunk'

export const usePromos = () => {
  const dispatch = useAppDispatch()
  const promos = useSelector(getPromos)

  useEffect(() => {
    if (!promos) {
      dispatch(requestPromos())
    }
  }, [])

  return promos
}

export const useRequestPromos = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(requestPromos())
  }, [])

  return useSelector(getPromos)
}