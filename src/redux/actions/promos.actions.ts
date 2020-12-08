import { InferActionsTypes } from '../redux-store';
import { promoType } from '../../types/types';

export type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    getPromos: (promos: Array<promoType>) => ({ type: 'PROMOS/GET_PROMOS', promos } as const),
    getPromoById: (promo: promoType) => ({ type: 'PROMOS/GET_PROMOS_BY_ID', promo } as const),
}