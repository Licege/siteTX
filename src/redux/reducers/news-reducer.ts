import { ActionsTypes } from '../actions/news.actions'
import { newsType } from '../../types/types'

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

export default NewsReducer
