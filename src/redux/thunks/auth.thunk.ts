import { authProfileType } from '../../types/types';
import { Dispatch } from 'redux';
import { actions, ActionType } from '../actions/auth.actions';
import { authAPI } from '../../api/api';
import { actions as profileActions, ActionsTypes as ProfileActionsType } from '../actions/profile.actions';

export const registration = (profile: authProfileType) => async (dispatch: Dispatch<ActionType>) => {
    const response = await authAPI.registration(profile)
    dispatch(actions.registration(response.data))
}

export const login = (profile: authProfileType) => async (dispatch: Dispatch<ActionType>) => {
    const response = await authAPI.login(profile)
    dispatch(actions.login(response.data))
}

export const logout = () => async (dispatch: Dispatch<ActionType | ProfileActionsType>) => {
    dispatch(actions.logout())
    dispatch(profileActions.clear())
}

export const refresh = async () => {
    await authAPI.refresh()
}