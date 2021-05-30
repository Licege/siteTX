import { useSelector } from 'react-redux'
import { useCategories, useMenuActions } from '../../../redux/hooks/menu.hooks'
import { useModalActions } from '../../../redux/hooks/app.hooks'
import { getDeliveryOrder } from '../../../redux/getters/bucket.getters'
import { dishType } from '../../../types/types'


const useCardDishLogic = (dish: dishType) => {
  const categories = useCategories()
  const { order } = useSelector(getDeliveryOrder)
  const { addDishToBucket, increaseCountDish, reduceCountDish } = useMenuActions()
  const { showModal } = useModalActions()

  const showDishInfoModal = () => showModal('DISH_INFO', { dish })

  const orderedDish = order.find(d => d.dishId === dish.id)
  const category = categories.find(category => category.id === dish.categoryId)
  const isCategoryDelivery = Boolean(category?.isDelivery)

  return { orderedDish, isCategoryDelivery, showDishInfoModal, addDishToBucket, increaseCountDish, reduceCountDish }
}

export default useCardDishLogic