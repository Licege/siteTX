import { AppStateType } from '../redux-store'

export const getPromosSelector = (state: AppStateType) => state.promosPage.promos

export const getPromoSelector = (state: AppStateType) => state.promosPage.currentPromo
