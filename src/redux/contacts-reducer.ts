import { contactsType } from '../types/types'
import { contactsAPI } from '../api/api'
import { Dispatch } from 'redux'

const GET_CONTACTS = 'GET_CONTACTS'

let initialState = {
    contacts: {} as contactsType,
}

type initialStateType = typeof initialState;

const contactsReducer = ( state = initialState, action: getContactsACType ): initialStateType => {
    switch (action.type) {
        case GET_CONTACTS:
            return { contacts: action.contacts }
        default:
            return state
    }
}

type getContactsACType = {
    type: typeof GET_CONTACTS,
    contacts: contactsType
}

export const getContactsAC = ( contacts: contactsType ): getContactsACType => ({ type: GET_CONTACTS, contacts })

export const getContacts = () => async ( dispatch: Dispatch<getContactsACType> ) => {
    let response = await contactsAPI.getContacts()
    dispatch(getContactsAC(response.data))
}

export default contactsReducer
