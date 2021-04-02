import { ActionsTypes } from '../actions/contacts.actions'
import { contactsType } from '../../types/types'

const initialState = {
    contacts: {} as contactsType,
}

type initialStateType = typeof initialState;

const contactsReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case 'CONTACTS/GET_CONTACTS':
            return { ...state, contacts: action.contacts }
        default:
            return state
    }
}

export default contactsReducer
