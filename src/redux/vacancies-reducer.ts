import {vacancyType} from "../types/types";
import {vacanciesAPI} from "../api/api";

const GET_VACANCIES = 'GET_VACANCIES';

let initialState = {
    vacancies: []
};

type InitialStateType = typeof initialState;

const vacanciesReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case GET_VACANCIES:
            return { ...state, vacancies: action.vacancies };
        default:
            return state;
    }
};

type GetVacanciesACType = {
    type: typeof GET_VACANCIES,
    vacancies: Array<vacancyType>
}

const getVacanciesAC = (vacancies: Array<vacancyType>): GetVacanciesACType => ({type: "GET_VACANCIES", vacancies});

export const getVacancies = () => async(dispatch: any) => {
    let response = await vacanciesAPI.getVacancies();
    dispatch(getVacanciesAC(response));
};

export default vacanciesReducer;