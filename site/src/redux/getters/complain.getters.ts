import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { AppStateType } from "../redux-store";

const selector = (state: AppStateType) => state.complainPage

export const getComplainTypes = createDraftSafeSelector(selector, state => state.complainTypes)