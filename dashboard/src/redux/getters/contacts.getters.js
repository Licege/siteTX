import {createDraftSafeSelector} from '@reduxjs/toolkit'

const selector = state => state.contactsPage

export const getContacts = createDraftSafeSelector(selector, state => state.contacts)