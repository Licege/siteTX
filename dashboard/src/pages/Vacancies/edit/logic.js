import {useCallback, useState} from 'react'
import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import {useCurrentVacancy} from '../../../redux/hooks/hooks'
import {useFileLogic} from '../../../hooks'
import {updateVacancy} from '../../../redux/thunks/vacancies.thunks'

export const useEditVacancyLogic = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const vacancy = useCurrentVacancy()
  const [description, setDescription] = useState(vacancy?.description || '')

  const { uploadFile, createFormDataWithFile } = useFileLogic()

  const editVacancy = useCallback(vacancy => {
    const formData = createFormDataWithFile(vacancy, 'image')

    if (description) formData.append('description', description)

    dispatch(updateVacancy(formData))
    history.push('/vacancies')
  }, [description])

  const cancel = useCallback(() => history.push('/vacancies'), [])

  return {
    vacancy,
    setDescription,
    uploadFile,
    editVacancy,
    cancel
  }
}