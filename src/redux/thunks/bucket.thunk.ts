import { ThunkAction } from 'redux-thunk';
import { actions, ActionsTypes } from '../actions/bucket.actions';
import { AppStateType } from '../redux-store';
import { bucketAPI } from '../../api/api';
import { IDeliveryPost } from '../../types/types';

export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestDeliverySettings = (): ThunkType => {
    return async (dispatch) => {
        const response = await bucketAPI.getDeliverySettings()
        dispatch(actions.getDeliverySettings(response.data))
    }
}
export const requestGlobalDeliverySettings = (): ThunkType => {
    return async (dispatch) => {
        const response = await bucketAPI.getDeliveryGlobalSettings()
        dispatch(actions.getDeliveryGlobalSettings(response.data))
    }
}

export const postOrder = (order: IDeliveryPost): ThunkType => {
    return async (dispatch) => {
        const response = await bucketAPI.postOrder(order)
        if (response.status === 201 || response.status === 200) {
            dispatch(actions.changeOrderStatus('created'))
            dispatch(actions.changeDeliveryPosted(true))
            dispatch(actions.clearBucket())
        } else {
            dispatch(actions.changeOrderStatus('error'))
        }
    }
}