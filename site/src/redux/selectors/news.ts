import { AppStateType } from '../redux-store'

export const getNewsSelector = (state: AppStateType) => state.newsPage.news

export const getCurrentNewsSelector = (state: AppStateType) => state.newsPage.currentNews

export const getNewsCountSelector = (state: AppStateType) => state.newsPage.totalCount
