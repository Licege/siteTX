import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { AppStateType } from '../redux-store';

const selector = (state: AppStateType) => state.contacts

export const getContacts = createDraftSafeSelector(selector, state => state.contacts)