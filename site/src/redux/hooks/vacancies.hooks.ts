import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../redux-store'
import { getMyResume, getVacancies } from '../getters/vacancies.getters'
import { requestVacancies } from '../thunks/vacancies.thunk'
import { requestReviews } from '../thunks/reviews.thunk'

export const useVacancies = ({ force = false } = {}) => {
  const dispatch = useAppDispatch()
  const vacancies = useSelector(getVacancies)

  useEffect(() => {
    if (force || !vacancies.length) {
      dispatch(requestVacancies())
    }
  }, [])

  return vacancies
}

export const useMyResume = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(requestReviews())
  }, [])

  return useSelector(getMyResume)
}