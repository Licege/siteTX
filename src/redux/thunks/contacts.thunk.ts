import { Dispatch } from 'redux';
import { ActionsTypes, actions } from '../actions/contacts.actions'
import { contactsAPI } from '../../api/api';

export const getContacts = () => async (dispatch: Dispatch<ActionsTypes>) => {
    const response = await contactsAPI.getContacts()
    dispatch(actions.getContacts(response.data))
}