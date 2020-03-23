import axios from "axios";
import {categoryType, contactsType, dishType, orderType, vacancyType} from "../types/types";

const baseURL = 'http://localhost:9090/api';

export const contactsAPI = {
    getContacts() {
        return axios.get<contactsType>(baseURL + `/contacts/`)
            .then(response => {
                return response.data;
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
    getDish(id: number) {
        return axios.get<dishType>(baseURL + `/menu/${id}`)
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
    }
};

export const orderAPI = {
    postOrder (order: orderType) {
        return axios.post(baseURL + `/orders/`, order)
            .then(response => {
                return response.data;
            })
    }
};

export const newsAPI = {
    getNews () {
        return axios.get(baseURL + `/news/`)
            .then(response => {
                return response.data;
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
        return axios.get(baseURL + `/delivery/settings/`)
            .then(response => {
                return response.data;
            })
    }
};
