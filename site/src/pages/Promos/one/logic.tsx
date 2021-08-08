import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { usePromo } from '../../../redux/hooks/promos.hooks'

export const usePromoPageLogic = () => {
  const promo = usePromo()
  const history = useHistory()

  useEffect(() => {
    window.scroll(0, 0)
  }, [promo?.title])

  const redirectToPromos = () => history.push('/actions')

  return { promo, redirectToPromos }
}