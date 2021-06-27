import * as modalsActions from '../../../redux/reducers/modals.reducer';
import { useAppDispatch } from '../../../redux/redux-store';
import { login } from '../../../redux/thunks/auth.thunk';
import { authProfileType } from '../../../types/types';

export const useModalAuthLogic = () => {
  const dispatch = useAppDispatch()

  const showRegisterModal = () => {
    dispatch(modalsActions.showModal({ name: 'REGISTER' }))
  }

  const hideModal = () => dispatch(modalsActions.hideModal())

  const submit = (profile: authProfileType) => dispatch(login(profile))

  return { submit, showRegisterModal, hideModal }
}