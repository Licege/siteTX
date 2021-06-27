import { AppStateType } from '../redux-store'

export const getMobileMenuStatusSelector = (state: AppStateType): boolean => state.app.isPhone
