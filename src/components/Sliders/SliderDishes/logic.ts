import { useDishes } from '../../../redux/hooks/menu.hooks'

export const useSliderDishesLogic = () => {
  const dishes = useDishes({ force: true })

  return { dishes }
}