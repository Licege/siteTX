import { useCallback } from 'react'
import { useAppDispatch } from '../redux-store'
import * as modalsActions from "../reducers/modals.reducer";

export const useModalActions = () => {
  const dispatch = useAppDispatch()

  const showModal = useCallback((name, props) => {
    dispatch(modalsActions.showModal({ name, props }))
  }, [])

  const hideModal = useCallback(() => dispatch(modalsActions.hideModal()), [])

  return { showModal, hideModal }
}