import {contactsType} from "../types/types";
import {contactsAPI} from "../api/api";

const GET_CONTACTS = 'GET_CONTACTS';

let initialState = {
    contacts: null as contactsType | null
};

type initialStateType = typeof initialState;

const contactsReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case GET_CONTACTS:
            return {contacts: action.contacts};
        default:
            return state;
    }
};

type getContactsACType = {
    type: typeof GET_CONTACTS,
    contacts: contactsType
}

export const getContactsAC = (contacts: contactsType):getContactsACType => ({type: GET_CONTACTS, contacts});

export const getContacts = () => async(dispatch: any) => {
    let response = await contactsAPI.getContacts();
    dispatch(getContactsAC(response));
};

export default contactsReducer;