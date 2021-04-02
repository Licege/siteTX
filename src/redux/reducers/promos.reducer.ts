import { ActionsTypes } from '../actions/promos.actions'
import { promoType } from '../../types/types'

let initialState = {
    promos: [] as Array<promoType>,
    currentPromo: {} as promoType,
}

const promosReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case 'PROMOS/GET_PROMOS':
            return { ...state, promos: action.promos }
        case 'PROMOS/GET_PROMOS_BY_ID':
            return { ...state, currentPromo: action.promo }
        default:
            return state
    }
}

export default promosReducer
