import { useSelector } from 'react-redux'
import { useCategories } from '@/redux/hooks/menu.hooks'
import { getIsPhone } from '@/redux/getters/app.getters'

export const useCategoriesFeedLogic = () => {
  const categories = useCategories()

  const isPhone = useSelector(getIsPhone)

  return { categories, isPhone }
}