import { AppStateType } from '../redux-store'

export const getVacanciesSelector = (state: any) => {
    return state.vacanciesPage.vacancies
}

export const getMyResumeSelector = (state: any) => {
    return state.vacanciesPage.resume
}
