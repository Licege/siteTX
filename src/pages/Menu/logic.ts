import { useSelector } from 'react-redux'
import { useCategories, useDishes } from '../../redux/hooks/menu.hooks'

import { getDeliveryOrder } from '../../redux/getters/bucket.getters'
import { getIsPhone } from '../../redux/getters/app.getters'
import { useDeliveryActions } from '../../redux/hooks/bucket.hooks'

export const useMenuLogic = () => {
  document.title = 'Меню'
  window.scrollTo(0, 0)
}

export const useMenuCardsLogic = () => {

  const dishes = useDishes()
  const { order } = useSelector(getDeliveryOrder)
  const isPhone = useSelector(getIsPhone)
  const categories = useCategories()

  const { addDishToBucket, increaseDishCount, reduceDishCount } = useDeliveryActions()

  return { dishes, categories, order, isPhone, addDishToBucket, increaseDishCount, reduceDishCount }
}