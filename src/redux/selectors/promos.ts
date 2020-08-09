import { AppStateType } from '../redux-store'

export const getPromosSelector = (state: AppStateType) => {
    return state.promosPage.promos
}

export const getPromoSelector = (state: AppStateType) => {
    return state.promosPage.currentPromo
}
