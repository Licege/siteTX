import { AppStateType } from '../redux-store';
import { complainTypeType } from '../../types/types';

export const getComplainTypeSelector = (state: AppStateType): complainTypeType[] => state.complainPage.complainTypes