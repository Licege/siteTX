import { useDishes, useDishesByCategoryId } from '../../redux/hooks/menu.hooks'

export const useMenuLogic = () => {
  document.title = 'Меню'
  window.scrollTo(0, 0)
}

export const useMenuCardsLogic = () => {
  useDishesByCategoryId()
  const dishes = useDishes()

  return { dishes }
}