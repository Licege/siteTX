import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { AppStateType } from "../redux-store";

const selector = (state: AppStateType) => state.authPage

export const getIsAuthenticated = createDraftSafeSelector(selector, modal => modal.isAuthenticated)