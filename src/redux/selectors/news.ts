import { AppStateType } from '../redux-store'

export const getNewsSelector = (state: any) => {
    return state.newsPage.news
}

export const getCurrentNewsSelector = (state: any) => {
    return state.newsPage.currentNews
}

export const getNewsCountSelector = (state: any) => {
    return state.newsPage.totalCount
}
