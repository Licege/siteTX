import { AppStateType } from '../redux-store'

export const getContactsSelector = (state: AppStateType) => state.contacts.contacts
