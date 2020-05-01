import axios from "axios";
import {
    authProfileType,
    categoryType,
    contactsType,
    dishType,
    IDeliveryPost,
    IOrder,
    IReview,
    resumeType,
    vacancyType
} from "../types/types";

export const serverUrl = 'http://localhost:9090/'
const baseURL = serverUrl + 'api';

export const authAPI = {
    login(profile: authProfileType) {
        return axios.post(baseURL + `/auth/login/`, profile)
            .then(response => {
                return response
            })
    },
    registration(profile: authProfileType) {
        return axios.post(baseURL + `/auth/registration/`, profile)
            .then(response => {
                return response
            })
    }
}

export const contactsAPI = {
    getContacts() {
        return axios.get<contactsType>(baseURL + `/contacts/`)
            .then(response => {
                return response
            })
    }
};

export const menuAPI = {
    getMenu() {
        return axios.get<Array<dishType>>(baseURL + `/menu/`)
            .then(response => {
                return response
            })
    },
    getMenuByCategory(category: string) {
        return axios.get<Array<dishType>>(baseURL + `/menu/${category}`)
            .then(respose => {
                return respose
            })
    },
    getDish(id: number) {
        return axios.get<dishType>(baseURL + `/menu/dish/${id}`)
            .then(response => {
                return response
            })
    },
    getCategories() {
        return axios.get<Array<categoryType>>(baseURL + `/categories/`)
            .then(response => {
                return response
            })
    }
};

export const vacanciesAPI = {
    getVacancies() {
        return axios.get<Array<vacancyType>>(baseURL + `/vacancies/`)
            .then(response => {
                return response
            })
    },
    postResume(resume: resumeType) {
        return axios.post<resumeType>(baseURL + `/resume/`, resume)
            .then(response => {
                return response
            })
    }
};

export const orderAPI = {
    postOrder (order: IOrder) {
        return axios.post(baseURL + `/orders/`, order)
            .then(response => {
                return response
            })
    }
};

export const newsAPI = {
    getNews (page = 1) {
        return axios.get(baseURL + `/news/?page=${page}`)
            .then(response => {
                return response
            })
    },
    getNewsById (id: string) {
        return axios.get(baseURL + `/news/${id}`)
            .then(response => {
                return response
            })
    }
};

export const bucketAPI = {
    getDeliverySettings() {
        return axios.get(baseURL + `/delivery-settings/common/`)
            .then(response => {
                return response
            })
    },

    getDeliveryGlobalSettings() {
        return axios.get(baseURL + `/delivery-settings/global/`)
            .then(response => {
                return response
            })
    },
    postOrder(order: IDeliveryPost) {
        return axios.post(baseURL + `/delivery/`, order)
            .then(response => {
                return response
            })
    }
};

export const ordersAPI = {
    postOrder(order: IOrder) {
        return axios.post(baseURL + `/order/`, order)
            .then(response => {
                return response
            })
    }
}

export const reviewsAPI = {
    getReviews() {
        return axios.get(baseURL + `/reviews/`)
            .then(response => {
                return response
            })
    },
    postReview(review: IReview) {
        return axios.post(baseURL + `/reviews/`, review)
            .then(response => {
                return response
            })
    }
}