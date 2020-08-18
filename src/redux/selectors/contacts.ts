import { AppStateType } from '../redux-store'

export const getContactsSelector = (state: AppStateType) => {
    return state.contacts.contacts
}
