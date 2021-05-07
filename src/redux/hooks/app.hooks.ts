import { useCallback } from 'react'
import { useAppDispatch } from '../redux-store'
import * as modalsActions from "../reducers/modals.reducer";
import { toggleMobileMenu } from '../reducers/app.reducer'
import { useSelector } from 'react-redux'
import { getIsPhone } from '../getters/app.getters'

export const useModalActions = () => {
  const dispatch = useAppDispatch()

  const showModal = useCallback((name, props) => {
    dispatch(modalsActions.showModal({ name, props }))
  }, [])

  const hideModal = useCallback(() => dispatch(modalsActions.hideModal()), [])

  return { showModal, hideModal }
}

export const useCheckIsOpenMobileMenu = () => useSelector(getIsPhone)

export const useMobileMenuActions = () => {
  const dispatch = useAppDispatch()
  const isOpenMobileMenu = useCheckIsOpenMobileMenu()

  const toggleMenu = useCallback(() => {
    dispatch(toggleMobileMenu())
    isOpenMobileMenu
      ? document.body.classList.remove('scroll_block')
      : document.body.classList.add('scroll_block')
  }, [isOpenMobileMenu])

  return { toggleMenu }
}