import { AppStateType } from '../redux-store'

export const getMobileMenuStatusSelector = (state: any): boolean => {
    return state.app.isOpen
}
