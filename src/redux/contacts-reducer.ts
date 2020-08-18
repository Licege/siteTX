import { contactsType } from '../types/types'
import { contactsAPI } from '../api/api'
import { Dispatch } from 'redux'
import { InferActionsTypes } from './redux-store'

let initialState = {
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

type ActionsTypes = InferActionsTypes<typeof actions>

const actions = {
    getContacts: (contacts: contactsType) => ({ type: 'CONTACTS/GET_CONTACTS', contacts } as const),
}

export const getContacts = () => async (dispatch: Dispatch<ActionsTypes>) => {
    let response = await contactsAPI.getContacts()
    dispatch(actions.getContacts(response.data))
}

export default contactsReducer
