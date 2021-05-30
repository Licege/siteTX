import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getMe } from '../getters/profile.getters'
import { useAppDispatch } from '../redux-store'
import { requestMe } from '../thunks/profile.thunks'

export const useMe = ({ force = false } = {}) => {
  const dispatch = useAppDispatch()
  const me = useSelector(getMe)

  useEffect(() => {
    if (!me || !Object.keys(me).length || force) {
      dispatch(requestMe())
    }
  }, [])

  return me
}