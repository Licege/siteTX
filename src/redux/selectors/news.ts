import { AppStateType } from '../redux-store'

export const getNewsSelector = (state: AppStateType) => {
    return state.newsPage.news
}

export const getCurrentNewsSelector = (state: AppStateType) => {
    return state.newsPage.currentNews
}

export const getNewsCountSelector = (state: AppStateType) => {
    return state.newsPage.totalCount
}
