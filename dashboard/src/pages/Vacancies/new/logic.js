import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import {useFileLogic} from '../../../hooks'
import {createNewVacancy} from '../../../redux/thunks/vacancies.thunks'

export const useCreateVacancyLogic = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { createFormDataWithFile, uploadFile } = useFileLogic()

  const createVacancy = vacancy => {
    const formData = createFormDataWithFile(vacancy, 'image')
    dispatch(createNewVacancy(formData))
    history.push('/vacancies')
  }

  const cancel = () => history.push('/vacancies')

  return { createVacancy, uploadFile, cancel }
}