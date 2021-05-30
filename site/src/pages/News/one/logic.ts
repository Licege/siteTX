import { useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useCurrentNews } from '../../../redux/hooks/news.hooks'

export const useCurrentNewsPageLogic = () => {
  const history = useHistory()

  useEffect(() => {
    document.title = 'Новости'
    window.scrollTo(0, 0)
  }, [])

  const currentNews = useCurrentNews()

  const redirectToAllNews = useCallback(() => history.push('/news'), [])

  return { currentNews, redirectToAllNews }
}