import axios from "axios";
import {
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

export const contactsAPI = {
    getContacts() {
        return axios.get<contactsType>(baseURL + `/contacts/`)
            .then(response => {
                return response;
            })
    }
};

export const menuAPI = {
    getMenu() {
        return axios.get<Array<dishType>>(baseURL + `/menu/`)
            .then(response => {
                return response.data;
            })
    },
    getMenuByCategory(category: string) {
        return axios.get<Array<dishType>>(baseURL + `/menu/${category}`,)
            .then(respose => {
                return respose
            })
    },
    getDish(id: number) {
        return axios.get<dishType>(baseURL + `/menu/dish/${id}`)
            .then(response => {
                return response.data;
            })
    },
    getCategories() {
        return axios.get<Array<categoryType>>(baseURL + `/categories/`)
            .then(response => {
                return response.data;
            })
    }
};

export const vacanciesAPI = {
    getVacancies() {
        return axios.get<Array<vacancyType>>(baseURL + `/vacancy/`)
            .then(response => {
                return response.data;
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
                return response.data;
            })
    }
};

export const newsAPI = {
    getNews (page = 1) {
        return axios.get(baseURL + `/news/?page=${page}`)
            .then(response => {
                return response;
            })
    },
    getNewsById (id: number) {
        return axios.get(baseURL + `/news/${id}`)
            .then(response => {
                return response.data;
            })
    }
};

export const bucketAPI = {
    getDeliverySettings() {
        return axios.get(baseURL + `/delivery-settings/common/`)
            .then(response => {
                return response.data;
            })
    },

    getDeliveryGlobalSettings() {
        return axios.get(baseURL + `/delivery-settings/global/`)
            .then(response => {
                return response.data;
            })
    },
    postOrder(order: IDeliveryPost) {
        return axios.post(baseURL + `/delivery/`, order)
            .then(response => {
                return response
            })
    }
};

export const cityAPI = {
    getCities() {
        return axios.get(baseURL + `/cities/`)
            .then(response => {
                return response.data
            })
    }
};

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