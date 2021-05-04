import { useRequestDishes } from '../../../redux/hooks/menu.hooks'

export const useSliderDishesLogic = () => {
  const dishes = useRequestDishes()

  return { dishes }
}