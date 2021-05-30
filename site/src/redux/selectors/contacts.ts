import { AppStateType } from '../redux-store'

export const getContactsSelector = (state: any) => {
    return state.contacts.contacts
}
