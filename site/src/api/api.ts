import request from "../lib/request";
import {
    authProfileType,
    categoryType,
    complainType,
    contactsType,
    dishType,
    IDeliveryPost,
    IOrder,
    IReview,
    orderDishType,
    profileType,
    promoType,
    resumeType,
    vacancyType,
} from '../types/types'

//const host = process.env.NODE_ENV === 'production' ? '//31.31.201.99/' : 'http://localhost'

const hostname = window.location.hostname
export const WS_BASE = process.env.NODE_ENV === 'production' ? `//${hostname}/` : `http://${hostname}/`

export const serverUrl = process.env.NODE_ENV === 'production' ? `//${hostname}/` : `http://${hostname}/`
const authUrl = process.env.NODE_ENV === 'production' ? `//${hostname}/` : `http://${hostname}/api/auth`
const baseURL = serverUrl + 'api/public'
const apiURL = `${serverUrl}api`


export const authAPI = {
    login(profile: authProfileType) {
        return request.post(`${authUrl}/login/`, profile)
          .then(payload => payload)
          .catch(reason => console.error(reason))
    },
    logout() {
        return request.get(`${authUrl}/logout/`)
          .then(payload => payload)
          .catch(reason => console.error(reason))
    },
    registration(profile: authProfileType) {
        return request.post(`${authUrl}/registration/`, profile)
          .then(payload => payload)
          .catch(reason => console.error(reason))
    },
    refresh() {
        console.log('delete this method');
        return {}
    },
}

export const contactsAPI = {
    async getContacts() {
        return request.get(`${baseURL}/contacts/`)
    },
}

export const profileAPI = {
    getMe() {
        // return fetch(`${apiURL}/public/me`, { credentials: 'include', method: 'GET' }).then(res => res.json()).then(res => res)
        return request.get(`${apiURL}/public/me`)
          .then(payload => payload)
          .catch(reason => console.error(reason))
        // return fetch(`${apiURL}/public/me`, {
        //     credentials: 'include',
        //     method: 'GET'
        // }).then(res => res.json()).then(res => {
        //     console.log(res)
        //     return res
        // })
    },
    getOrdersHistory() {
        return request.get(`${apiURL}/public/me/orders`)
          .then(payload => payload)
          .catch(reason => console.error(reason))
    }
}

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

        return await request.get(`${baseURL}/menu/`)
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
        return request.get(`${baseURL}/menu/${categoryId}`)
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

        return request.get(`${baseURL}/menu/dish/${id}`)
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

        return request.get(`${baseURL}/categories/`)
          .then(payload => payload)
          .catch(reason => console.error(reason))

        // return axios.get<Array<categoryType>>(baseURL + `/categories/`)
        //     .then(response => {
        //         return response
        //     })
    },
}

export const promoAPI = {
    getPromos() {
        return request.get(baseURL + `/promos/`)
          .then(payload => payload)
          .catch(reason => console.error(reason))
    },
    getPromoById(id: string) {
        return request.get(baseURL + `/promos/${id}`)
          .then(payload => payload)
          .catch(reason => console.error(reason))
    },
}

export const vacanciesAPI = {
    getVacancies() {
        return request.get(baseURL + `/vacancies/`)
          .then(payload => payload)
    },
    postResume(resume: resumeType) {
        return request.post(baseURL + `/resume/`, resume)
          .then(payload => payload)
    },
}

export const orderAPI = {
    postOrder(order: IOrder) {
        return request.post(baseURL + `/orders/`, order)
          .then(payload => payload)
          .catch(reason => console.error(reason))
    },
}

export const newsAPI = {
    getNews(page = 1) {
        return request.get(baseURL + `/news/?page=${page}`)
          .then(payload => payload)
          .catch(reason => console.error(reason))
    },
    getNewsById(id: string) {
        return request.get(baseURL + `/news/${id}`)
          .then(payload => payload)
          .catch(reason => console.error(reason))
    },
}

export const bucketAPI = {
    getDeliverySettings() {
        return request.get(baseURL + `/delivery-settings/common/`)
          .then(payload => payload)
          .catch(reason => console.error(reason))
    },

    getDeliveryGlobalSettings() {
        return request.get(baseURL + `/delivery-settings/global/`)
          .then(payload => payload)
          .catch(reason => console.error(reason))
    },

    async postOrder(order: IDeliveryPost) {
        return request.post(`${baseURL}/delivery/`, order)
    },
}

export const ordersAPI = {
    postOrder(order: IOrder) {
        return request.post(baseURL + `/order/`, order)
          .then(payload => payload)
          .catch(reason => console.error(reason))
    },
}

export const reviewsAPI = {
    getReviews() {
        return request.get(baseURL + `/reviews/`)
          .then(payload => payload)
          .catch(reason => console.error(reason))
    },
    postReview(review: IReview) {
        return request.post(`/public/reviews/`, review)
          .then(payload => payload)
          .catch(reason => console.error(reason))
    },
}

export const complainAPI = {
    getComplainTypes() {
        return request.get(`${baseURL}/complain-types`)
          .then(payload => payload)
          .catch(reason => console.error(reason))
    },
    async postComplainPrivate(complain: complainType) {
        console.log('доделать')
        // return await apiUserRequest.post(`${apiURL}/private/complain`, complain)
    },
    postComplainPublic(complain: complainType) {
        return request.post(`${baseURL}/complain`, complain)
          .then(payload => payload)
          .catch(reason => console.error(reason))
    }
}
