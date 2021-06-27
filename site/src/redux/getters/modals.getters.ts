import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { AppStateType } from '../redux-store';

const selector = (state: AppStateType) => state.modal

export const getCurrentModal = createDraftSafeSelector(selector, modal => modal.current)