import { promoType } from '../types/types'
import { promoAPI } from '../api/api'

const GET_PROMOS = 'PROMOS/GET_PROMOS'
const GET_PROMO_BY_ID = 'PROMOS/GET_PROMOS_BY_ID'

let initialState = {
    promos: [] as Array<promoType>,
    currentPromo: {} as promoType,
}

const promosReducer = ( state = initialState, action: ActionsType ) => {
    switch (action.type) {
        case GET_PROMOS:
            return { ...state, promos: action.promos }
        case GET_PROMO_BY_ID:
            return { ...state, currentPromo: action.promo }
        default:
            return state
    }
}

type getPromosACType = {
    type: typeof GET_PROMOS
    promos: promoType[]
}

type getPromoByIdACType = {
    type: typeof GET_PROMO_BY_ID
    promo: promoType
}

const getPromosAC = ( promos: Array<promoType> ): getPromosACType => ({ type: GET_PROMOS, promos })
const getPromoByIdAC = ( promo: promoType ): getPromoByIdACType => ({ type: GET_PROMO_BY_ID, promo })

type ActionsType = getPromosACType & getPromoByIdACType

export const requestPromos = () => async ( dispatch: any ) => {
    let response = await promoAPI.getPromos()
    dispatch(getPromosAC(response.data))
}

export const requestPromoById = ( id: string ) => async ( dispatch: any ) => {
    let response = await promoAPI.getPromoById(id)
    dispatch(getPromoByIdAC(response.data))
}

export default promosReducer
