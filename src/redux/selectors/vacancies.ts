import { AppStateType } from '../redux-store'

export const getVacanciesSelector = (state: AppStateType) => {
    return state.vacanciesPage.vacancies
}

export const getMyResumeSelector = (state: AppStateType) => {
    return state.vacanciesPage.resume
}
