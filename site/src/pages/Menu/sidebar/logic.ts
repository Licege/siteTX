import { useEffect, useState } from 'react'
import { useCategories } from '@/redux/hooks/menu.hooks'

export const useMenuSidebarLogic = () => {
  const [height, setHeight] = useState(`${document.body.scrollHeight - 300}px`)
  const categories = useCategories()

  useEffect(() => {
    setHeight(`${document.body.scrollHeight - 300}px`)
  }, [])

  return { height, categories }
}