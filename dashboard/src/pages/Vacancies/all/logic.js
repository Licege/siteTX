import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {useVacancies} from '../../../redux/hooks/hooks'
import {deleteVacancy} from '../../../redux/thunks/vacancies.thunks'

export const useHeaderVacanciesLogic = () => {
  const history = useHistory()

  const redirectToCreateVacancy = useCallback(() => history.push(`vacancies/new`), [])

  return { redirectToCreateVacancy }
}

export const useCardVacanciesLogic = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const vacancies = useVacancies()

  const redirectToChangeVacancy = useCallback(id => () => {
    history.push(`vacancies/edit/${id}`)
  }, [])

  const removeVacancy = useCallback(id => () => dispatch(deleteVacancy(id)), [])

  return { vacancies, redirectToChangeVacancy, removeVacancy }
}