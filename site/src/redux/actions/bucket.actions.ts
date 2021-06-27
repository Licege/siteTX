// import { InferActionsTypes } from '../redux-store';
import { deliveryGlobalSettingsType, deliverySettingsType, dishType } from '../../types/types';

export const actions = {
  addDish: (dish: dishType) => ({ type: 'BUCKET/ADD_DISH', dish } as const),
  increaseDishCount: (dish: dishType) => ({ type: 'BUCKET/INCREASE_DISH_COUNT', dish } as const),
  reduceDishCount: (dish: dishType) => ({ type: 'BUCKET/REDUCE_DISH_COUNT', dish } as const),
  removeDish: (id: number | string) => ({ type: 'BUCKET/REMOVE_DISH', id } as const),
  changeDishCount: (dish: dishType, count: number) => ({
    type: 'BUCKET/CHANGE_DISH_COUNT',
    dish,
    count,
  } as const),
  clearBucket: () => ({ type: 'BUCKET/CLEAR' } as const),
  changeDeliveryPosted: (status: boolean) => ({
    type: 'BUCKET/DELIVERY_POSTED',
    status,
  } as const),
  changeOrderStatus: (status: 'created' | 'error') => ({ type: 'BUCKET/ORDER_STATUS', status } as const),
  getDeliverySettings: (settings: Array<deliverySettingsType>) => ({
    type: 'BUCKET/GET_DELIVERY_SETTINGS',
    settings,
  } as const),
  getDeliveryGlobalSettings: (settings: deliveryGlobalSettingsType) => ({
    type: 'BUCKET/GET_DELIVERY_GLOBAL_SETTINGS',
    settings,
  } as const),
}

export type ActionsTypes = any
