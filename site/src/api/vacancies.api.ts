import request from '../lib/request';
import { resumeType } from '../types/types';
import { baseUrl } from './config';

export const vacanciesAPI = {
  getVacancies() {
    return request.get(`${baseUrl}/vacancies/`)
      .then(payload => payload)
  },
  getVacancyById: async (id: string) => request.get(`${baseUrl}/vacancies/${id}`),
  postResume(resume: resumeType) {
    return request.post(`${baseUrl}/resume/`, resume)
      .then(payload => payload)
  },
}