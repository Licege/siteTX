import {newsType} from "../types/types";
import {newsAPI} from "../api/api";

const GET_NEWS = 'GET_NEWS';
const GET_CURRENT_NEWS = 'GET_CURRENT_NEWS';

let initialState = {
    currentNews: {},
    news: []
};

type InitialStateType = typeof initialState;

const NewsReducer = (state = initialState, action: any): InitialStateType => {
    switch(action.type) {
        case GET_NEWS:
            return { ...state, news: action.news };
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
}

const getNewsAC = (news: Array<newsType>):getNewsACType => ({type: GET_NEWS, news});
const getCurrentNewsAC = (currentNews: newsType): getCurrentNewsACType => ({type: GET_CURRENT_NEWS, currentNews});

export const requestNews = () => async (dispatch: any) => {
    let response = await newsAPI.getNews();
    dispatch(getNewsAC(response))
};

export const requestCurrentNews = (id: number) => async (dispatch: any) => {
    let response = await newsAPI.getNewsById(id);
    dispatch(getCurrentNewsAC(response));
};

export default NewsReducer;