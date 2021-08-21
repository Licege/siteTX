import { useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useCurrentVacancy } from '../../../redux/hooks/vacancies.hooks';

export const useCurrentVacancyPageLogic = () => {
  const history = useHistory()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const currentVacancy = useCurrentVacancy()

  const redirectToAllVacancies = useCallback(() => history.push('/vacancies'), [])

  return { currentVacancy, redirectToAllVacancies }
}