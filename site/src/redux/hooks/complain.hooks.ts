import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../redux-store'
import { requestComplainTypes } from '../thunks/complain.thunk'
import { getComplainTypes } from '../getters/complain.getters'

export const useComplainTypes = ({ force = false } = {}) => {
  const dispatch = useAppDispatch()
  const complainTypes = useSelector(getComplainTypes)

  useEffect(() => {
    if (!complainTypes?.length || force) dispatch(requestComplainTypes())
  }, [])

  return complainTypes;
}