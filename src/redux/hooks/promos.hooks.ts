import { useAppDispatch } from '../redux-store'
import { useSelector } from 'react-redux'
import { getPromos } from '../getters/promos.getters'
import { useEffect } from 'react'
import { requestPromos } from '../thunks/promos.thunk'

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