import { useHistory } from 'react-router-dom'
import { usePromo } from '../../../redux/hooks/promos.hooks'
import { useEffect } from 'react'

export const usePromoPageLogic = () => {
  const promo = usePromo()
  const history = useHistory()

  useEffect(() => {
    window.scroll(0, 0)
    document.title = promo?.title || 'Акции'
  }, [])

  const redirectToPromos = () => history.push('/actions')

  return { promo, redirectToPromos }
}