import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { promoType } from '../types/types'
import { promoAPI } from '../api/api'
import { AppStateType, InferActionsTypes } from './redux-store'


let initialState = {
    promos: [] as Array<promoType>,
    currentPromo: {} as promoType,
}

const promosReducer = ( state = initialState, action: ActionsTypes ) => {
    switch (action.type) {
        case 'PROMOS/GET_PROMOS':
            return { ...state, promos: action.promos }
        case 'PROMOS/GET_PROMOS_BY_ID':
            return { ...state, currentPromo: action.promo }
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

const actions = {
    getPromos: ( promos: Array<promoType> ) => ({ type: 'PROMOS/GET_PROMOS', promos } as const),
    getPromoById: ( promo: promoType ) => ({ type: 'PROMOS/GET_PROMOS_BY_ID', promo } as const),
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestPromos = (): ThunkType => {
    return async ( dispatch: Dispatch<ActionsTypes> ) => {
        let response = await promoAPI.getPromos()
        dispatch(actions.getPromos(response.data))
    }
}
export const requestPromoById = ( id: string ): ThunkType => {
    return async ( dispatch: Dispatch<ActionsTypes> ) => {
        let response = await promoAPI.getPromoById(id)
        dispatch(actions.getPromoById(response.data))
    }
}

export default promosReducer
