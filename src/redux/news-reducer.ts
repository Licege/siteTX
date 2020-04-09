import {newsType} from "../types/types";
import {newsAPI} from "../api/api";

const GET_NEWS = 'NEWS/GET_NEWS';
const GET_CURRENT_NEWS = 'NEWS/GET_CURRENT_NEWS';

let initialState = {
    currentNews: {} as newsType,
    news: [] as Array<newsType>,
    totalCount: 0
};

type InitialStateType = typeof initialState;

const NewsReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch(action.type) {
        case GET_NEWS:
            return { ...state, news: action.news, totalCount: action.totalCount };
        case GET_CURRENT_NEWS:
            return { ...state, currentNews: action.currentNews };
        default:
            return state;
    }
};

type getCurrentNewsACType = {
    type: typeof GET_CURRENT_NEWS,
    currentNews: newsType
}

type getNewsACType = {
    type: typeof GET_NEWS,
    news: Array<newsType>
    totalCount: number
}

type ActionType = getNewsACType & getCurrentNewsACType

const getNewsAC = (news: Array<newsType>, totalCount: number): getNewsACType => ({type: GET_NEWS, news, totalCount});
const getCurrentNewsAC = (currentNews: newsType): getCurrentNewsACType => ({type: GET_CURRENT_NEWS, currentNews});

export const requestNews = (page?: number | undefined) => async (dispatch: any) => {
    let response = await newsAPI.getNews(page);
    dispatch(getNewsAC(response.data.news_list, response.data.total_count))
};

export const requestCurrentNews = (id: number) => async (dispatch: any) => {
    let response = await newsAPI.getNewsById(id);
    dispatch(getCurrentNewsAC(response));
};

export default NewsReducer;