import { useEffect } from 'react'
import { useVacancies } from '../../redux/hooks/vacancies.hooks'

export const useVacanciesPageLogic = () => {
  const vacancies = useVacancies()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return { vacancies }
}