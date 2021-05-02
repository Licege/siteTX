import { useCategories, useDishes, useMenuActions } from '../../../redux/hooks/menu.hooks'

const useSauceSliderLogic = () => {
  const dishes = useDishes()
  const categories = useCategories()
  const { addDishToBucket } = useMenuActions()

  const sauceCategoryId = categories.find(category => category.title === ('Соус' || 'Соусы'))?.id
  const sauces = dishes.filter(dish => dish.categoryId === sauceCategoryId)

  return { sauces, categories, addDishToBucket }
}

export default useSauceSliderLogic