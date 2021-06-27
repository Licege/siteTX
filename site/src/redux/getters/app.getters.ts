import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { AppStateType } from '../redux-store';

const selector = (state: AppStateType) => state.app

export const getIsPhone = createDraftSafeSelector(selector, state => state.isPhone)