import {useCallback} from 'react'
import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import {useCurrentVacancy} from '../../../redux/hooks/hooks'
import {useFileLogic} from '../../../hooks'
import {updateVacancy} from '../../../redux/thunks/vacancies.thunks'

export const useEditVacancyLogic = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const vacancy = useCurrentVacancy()
  const { uploadFile, createFormDataWithFile } = useFileLogic()

  const editVacancy = useCallback(vacancy => {
    const formData = createFormDataWithFile(vacancy, 'image')
    dispatch(updateVacancy(formData))
    history.push('/vacancies')
  }, [])

  const cancel = () => history.push('/vacancies')

  return {
    vacancy,
    uploadFile,
    editVacancy,
    cancel
  }
}