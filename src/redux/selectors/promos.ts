import { AppStateType } from '../redux-store'

export const getPromosSelector = (state: any) => {
    return state.promosPage.promos
}

export const getPromoSelector = (state: any) => {
    return state.promosPage.currentPromo
}
