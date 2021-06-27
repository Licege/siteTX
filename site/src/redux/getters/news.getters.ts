import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { AppStateType } from '../redux-store';

const selector = (state: AppStateType) => state.newsPage

export const getNews = createDraftSafeSelector(selector, state => state.news)
export const getNewsTotal = createDraftSafeSelector(selector, state => state.totalCount)
export const getCurrentNews = createDraftSafeSelector(selector, state => state.currentNews)