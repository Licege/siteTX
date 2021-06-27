import { useCallback, useEffect } from 'react'
import { useNews } from '../../../redux/hooks/news.hooks'
import { useAppDispatch } from '../../../redux/redux-store'
import { requestNews } from '../../../redux/thunks/news.thunk'

export const useNewsPageLogic = () => {
  const dispatch = useAppDispatch()
  const { news, totalCount } = useNews()

  useEffect(() => {
    document.title = 'Новости'
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    dispatch(requestNews())
  }, [dispatch])

  const onPageChange = useCallback((page: number) => {
    dispatch(requestNews(page))
  }, [dispatch])

  return { news, totalCount, onPageChange }
}