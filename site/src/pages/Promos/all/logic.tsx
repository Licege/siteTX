import { useEffect } from 'react'
import { usePromos } from '../../../redux/hooks/promos.hooks'

export const usePromosPageLogic = () => {
  const promos = usePromos()

  useEffect(() => {
    document.title = 'Акции'
    window.scroll(0, 0)
  }, [])

  return { promos }
}