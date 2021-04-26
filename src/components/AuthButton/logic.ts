import { useSelector } from "react-redux";
import {useHistory} from "react-router-dom";

import {useAppDispatch} from "../../redux/redux-store";
import * as authThunks from '../../redux/thunks/auth.thunk'
import * as modalsActions from "../../redux/reducers/modals.reducer";
import {getIsAuthenticated} from "../../redux/getters/auth.getters";

export const useAuthButtonLogic = () => {
  const dispatch = useAppDispatch()

  const isAuthenticated = useSelector(getIsAuthenticated)

  const showAuthModal = () => {
    dispatch(modalsActions.showModal({name: 'AUTH'}))
  }

  return { showAuthModal, isAuthenticated }
}

export const useAuthDropdownMenuLogic = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()

  const logout = () => {
    dispatch(authThunks.logout())
  }

  const redirectToProfile = () => {
    history.push('/me')
  }

  return { redirectToProfile, logout }
}