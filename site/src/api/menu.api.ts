import request from '../lib/request';
import { baseUrl } from './config';

export const menuAPI = {
  async getMenu() {
    // return fetch(`${baseURL}/menu/`, {
    //     headers: { 'Content-Type': 'application/json' },
    //     credentials: 'include'
    // })
    //   .then(res => {
    //       console.log(res);
    //       return res.json()
    //   })
    //   .catch(reason => console.error(reason))

    return request.get(`${baseUrl}/menu/`)
      .then(payload => payload)
      .catch(reason => console.error(reason))

    // return axios.get<Array<dishType>>(baseURL + `/menu/`)
    //     .then(response => {
    //         return response
    //     })
  },
  getMenuByCategory(categoryId: number | string) {
    // return fetch(`${baseURL}/menu/${categoryId}`, {
    //     headers: { 'Content-Type': 'application/json' },
    //     credentials: 'include'
    // })
    //   .then(res => res.json())
    //   .then(payload => payload)
    //   .catch(reason => console.error(reason))
    return request.get(`${baseUrl}/menu/${categoryId}`)
      .then(payload => payload)
      .catch(reason => console.error(reason))

    // return axios.get<Array<dishType>>(baseURL + `/menu/${categoryId}`)
    //     .then(response => {
    //         return response
    //     })
  },
  getDish(id: number) {
    // return fetch(`${baseURL}/menu/dish/${id}`, {
    //     headers: { 'Content-Type': 'application/json' },
    //     credentials: 'include'
    // })
    //   .then(res => res.json())
    //   .then(payload => payload)
    //   .catch(reason => console.error(reason))

    return request.get(`${baseUrl}/menu/dish/${id}`)
      .then(payload => payload)
      .catch(reason => console.error(reason))

    // return axios.get<dishType>(baseURL + `/menu/dish/${id}`)
    //     .then(response => {
    //         return response
    //     })
  },
  getCategories() {
    // return fetch(`${baseURL}/categories/`, {
    //     headers: { 'Content-Type': 'application/json' },
    //     credentials: 'include'
    // })
    //   .then(res => res.json())
    //   .then(payload => payload)
    //   .catch(reason => console.error(reason))

    return request.get(`${baseUrl}/categories/`)
      .then(payload => payload)
      .catch(reason => console.error(reason))

    // return axios.get<Array<categoryType>>(baseURL + `/categories/`)
    //     .then(response => {
    //         return response
    //     })
  },
}