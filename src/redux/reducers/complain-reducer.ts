import { ActionsTypes } from '../actions/complain.actions'
import { selectOptionsType } from '../../types/types';

const initialState = {
    complainTypes: [] as selectOptionsType[],
}

export type InitialState = typeof initialState

const complainReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case 'COMPLAIN/GET_COMPLAIN_TYPES':
            return {
                ...state,
                complainTypes: action.complainTypes.map(({ id, title }) => ({ value: id, label: title }))
            }
        default:
            return state
    }
}

export default complainReducer