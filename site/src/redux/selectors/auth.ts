import { AppStateType } from '../redux-store'

export const getAuthStatus = (state: AppStateType): boolean => {
    return state.authPage.isAuthenticated
}
