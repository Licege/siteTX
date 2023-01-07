import { useCheckIsOpenMobileMenu, useMobileMenuActions } from '@/redux/hooks/app.hooks'
import { useCategories } from '@/redux/hooks/menu.hooks'

export const useHeaderLogic = () => {
  const isMenuOpen = useCheckIsOpenMobileMenu()

  return { isMenuOpen }
}

export const useMobileMenuLogic = () => {
  const isMenuOpen = useCheckIsOpenMobileMenu()
  const categories = useCategories()
  const { toggleMenu } = useMobileMenuActions()

  return { isMenuOpen, categories, toggleMenu }
}