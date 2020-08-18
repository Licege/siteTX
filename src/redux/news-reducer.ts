import { newsType } from '../types/types'
import { newsAPI } from '../api/api'
import { Dispatch } from 'redux'
import { InferActionsTypes } from './redux-store'


let initialState = {
    currentNews: {} as newsType,
    news: [] as Array<newsType>,
    totalCount: 0,
}

type InitialStateType = typeof initialState;

const NewsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'NEWS/GET_NEWS':
            return { ...state, news: action.news, totalCount: action.total_count }
        case 'NEWS/GET_CURRENT_NEWS':
            return { ...state, currentNews: action.currentNews }
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

const actions = {
    getNews: (news: Array<newsType>, total_count: number) => ({
        type: 'NEWS/GET_NEWS',
        news,
        total_count,
    } as const),
    getCurrentNews: (currentNews: newsType) => ({ type: 'NEWS/GET_CURRENT_NEWS', currentNews } as const),
}

export const requestNews = (page?: number) => async (dispatch: Dispatch<ActionsTypes>) => {
    let response = await newsAPI.getNews(page)
    dispatch(actions.getNews(response.data.news, response.data.total_count))
}

export const requestCurrentNews = (id: string) => async (dispatch: Dispatch<ActionsTypes>) => {
    let response = await newsAPI.getNewsById(id)
    dispatch(actions.getCurrentNews(response.data))
}

export default NewsReducer
