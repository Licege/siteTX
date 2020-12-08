import { AppStateType } from '../redux-store';
import { selectOptionsType } from '../../types/types';

export const getComplainTypeSelector = (state: AppStateType): selectOptionsType[] => {
    return state.complainPage.complainTypes
}