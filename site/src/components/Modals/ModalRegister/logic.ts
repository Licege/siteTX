import * as modalsActions from "../../../redux/reducers/modals.reducer";
import { useAppDispatch } from "../../../redux/redux-store";
import {authRegProfileType} from "../../../types/types";
import {registration} from "../../../redux/thunks/auth.thunk";

export const useModalRegisterLogic = () => {
  const dispatch = useAppDispatch()

  const showAuthModal = () => {
    dispatch(modalsActions.showModal({name: 'AUTH'}))
  }

  const hideModal = () => dispatch(modalsActions.hideModal())

  const submit = (profile: authRegProfileType) => {
    dispatch(registration(profile))
  }

  return { submit, showAuthModal, hideModal }
}