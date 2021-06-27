import { AppStateType } from '../redux-store'

export const getAuthStatus = (state: AppStateType): boolean => state.authPage.isAuthenticated
