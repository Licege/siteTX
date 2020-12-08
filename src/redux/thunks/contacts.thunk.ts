import { Dispatch } from 'redux';
import { ActionsTypes, actions } from '../actions/contacts.actions'
import { contactsAPI } from '../../api/api';
import contactsReducer from '../reducers/contacts-reducer';

export const getContacts = () => async (dispatch: Dispatch<ActionsTypes>) => {
    const response = await contactsAPI.getContacts()
    dispatch(actions.getContacts(response.data))
}

export default contactsReducer