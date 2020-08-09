import { AppStateType } from '../redux-store'

export const getAuthStatus = (state: AppStateType) => {
    return state.authPage.isAuthenticated
}
