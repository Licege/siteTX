import { createDraftSafeSelector } from '@reduxjs/toolkit'

const selector = state => state.modal

export const getCurrentModal = createDraftSafeSelector(selector, modal => modal.current)