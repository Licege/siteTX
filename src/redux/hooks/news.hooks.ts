import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../redux-store'
import { getCurrentNews, getNews, getNewsTotal } from '../getters/news.getters'
import { requestCurrentNews, requestNews } from '../thunks/news.thunk'

type IdParam = {
  id: string
}

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

export const useCurrentNews = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams<IdParam>()

  useEffect(() => {
    dispatch(requestCurrentNews(id))
  }, [])

  return useSelector(getCurrentNews)
}

