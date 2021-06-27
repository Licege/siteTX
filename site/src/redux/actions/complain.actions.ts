// import { InferActionsTypes } from '../redux-store';
import { complainType, complainTypeType } from '../../types/types';

export type ActionsTypes = any

export const actions = {
  getComplainTypes: (complainTypes: complainTypeType[]) => ({ type: 'COMPLAIN/GET_COMPLAIN_TYPES', complainTypes } as const),
  postComplain: (complain: complainType) => ({ type: 'COMPLAIN/POST_COMPLAIN', complain } as const)
}