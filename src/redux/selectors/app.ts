import { AppStateType } from '../redux-store'

export const getMobileMenuStatusSelector = ( state: AppStateType ): boolean => {
    return state.app.isOpen
}
