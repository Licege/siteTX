import { useEffect } from 'react'
import { usePromos } from '../../../redux/hooks/promos.hooks'

export const usePromosPageLogic = () => {
  const promos = usePromos()

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return { promos }
}