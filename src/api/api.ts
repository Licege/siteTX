import axios from "axios";
import {category, contactsType, dish} from "../types/types";

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
        return axios.get<Array<dish>>(baseURL + `/menu/`)
            .then(response => {
                return response.data;
            })
    },
    getDish(id: number) {
        return axios.get<dish>(baseURL + `/menu/${id}`)
            .then(response => {
                return response.data;
            })
    },
    getCategories() {
        return axios.get<Array<category>>(baseURL + `/categories/`)
            .then(response => {
                return response.data;
            })
    }
};

