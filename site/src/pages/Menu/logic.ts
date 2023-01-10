import { useEffect } from 'react';
import { useDishes, useDishesByCategoryId } from '@/redux/hooks/menu.hooks'

export const useMenuLogic = () => {
  window.scrollTo(0, 0)
}

export const useMenuCardsLogic = () => {
  useDishesByCategoryId()
  const dishes = useDishes()

  useEffect(() => {
    // TODO Добавить плавную прокрутку scroll-behavior: smooth;
    window.scrollTo(0, 0)
  }, [dishes])

  return { dishes }
}