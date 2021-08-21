import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../redux-store'
import { getCurrentVacancy, getMyResume, getVacancies } from '../getters/vacancies.getters'
import { requestCurrentVacancy, requestVacancies } from '../thunks/vacancies.thunk'
import { requestReviews } from '../thunks/reviews.thunk'
import { clearCurrentVacancy } from '../reducers/vacancies.reducer';

type IdParam = {
  id: string
}

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

export const useCurrentVacancy = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams<IdParam>()

  useEffect(() => {
    dispatch(requestCurrentVacancy(id))

    return () => {
      dispatch(clearCurrentVacancy())
    }
  }, [dispatch, id])

  return useSelector(getCurrentVacancy)
}

export const useMyResume = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(requestReviews())
  }, [dispatch])

  return useSelector(getMyResume)
}