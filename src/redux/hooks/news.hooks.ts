import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../redux-store'
import { getNews, getNewsTotal } from '../getters/news.getters'
import { requestNews } from '../thunks/news.thunk'

export const useNews = ({ force = false } = {}) => {
  const dispatch = useAppDispatch()
  const news = useSelector(getNews)
  const totalCount = useSelector(getNewsTotal)

  useEffect(() => {
    if (force || !news?.length) {
      dispatch(requestNews())
    }
  }, [])

  return { news, totalCount }
}

