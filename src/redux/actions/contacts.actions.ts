// import { InferActionsTypes } from '../redux-store';
import { contactsType } from '../../types/types';

export type ActionsTypes = any

export const actions = {
    getContacts: (contacts: contactsType) => ({ type: 'CONTACTS/GET_CONTACTS', contacts } as const),
}