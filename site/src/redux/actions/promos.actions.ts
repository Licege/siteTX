import { promoType } from '../../types/types';

export type ActionsTypes = any

export const actions = {
  getPromos: (promos: Array<promoType>) => ({ type: 'PROMOS/GET_PROMOS', promos } as const),
  getPromoById: (promo: promoType) => ({ type: 'PROMOS/GET_PROMOS_BY_ID', promo } as const),
}