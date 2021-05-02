import { useCallback } from 'react'
import { useAppDispatch } from '../../redux/redux-store'
import { reviewType } from '../../types/types'

export const useFormContactsLogic = () => {
  const dispatch = useAppDispatch()

  const postForm = useCallback((data: reviewType) => {
    data.createdAt = Date.parse(new Date().toString())
    console.log('не готово')
  }, [])

  return { postForm };
}