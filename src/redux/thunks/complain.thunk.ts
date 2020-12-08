import { ThunkAction } from 'redux-thunk'
import { ActionsTypes, actions } from '../actions/complain.actions'
import { AppStateType } from '../redux-store'
import { complainAPI } from '../../api/api'
import { complainType } from '../../types/types'
import { getAuthStatus } from '../selectors/auth'

export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestComplainTypes = (): ThunkType => {
    return async (dispatch) => {
        const response = await complainAPI.getComplainTypes()
        dispatch(actions.getComplainTypes(response.data))
    }
}

export const requestComplain = (complain: complainType): ThunkType => {
    return async (dispatch, getState) => {
        const state = await getState();
        const isAuthenticated = getAuthStatus(state);
        const response = isAuthenticated
            ? await complainAPI.postComplainPrivate(complain)
            : await complainAPI.postComplainPublic(complain)
        dispatch(actions.postComplain(response.data))
    }
}