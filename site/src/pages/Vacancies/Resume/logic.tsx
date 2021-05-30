import { useEffect } from 'react'
import { useMe } from '../../../redux/hooks/profile.hooks'
import { useMyResume } from '../../../redux/hooks/vacancies.hooks'
import { isNil } from '../../../plugins/helpers'

export const useResumePageLogic = () => {
  const me = useMe()
  const resume = useMyResume()

  const initialValues = !isNil(resume) ? resume : me

  useEffect(() => {
    window.scroll(0, 0)
  })

  const postResume = (data: any) => {
    console.log(data)
  }

  return { initialValues, postResume }
}