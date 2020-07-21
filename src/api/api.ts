import axios from "axios";
import {
    authProfileType,
    categoryType,
    contactsType,
    dishType,
    IDeliveryPost,
    IOrder,
    IReview, promoType,
    resumeType,
    vacancyType
} from "../types/types";

const host = process.env.NODE_ENV === 'production' ? '//31.31.201.99/' : 'http://localhost'

export const WS_BASE = `${host}:9091/`

export const serverUrl = process.env.NODE_ENV === 'production' ? host : `${host}:9090/`
const baseURL = serverUrl + 'api/public';
const apiUserRequest = axios.create({
    baseURL,
    headers: {
        'Authorization': localStorage.getItem('accessToken')
    }
})

apiUserRequest.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
        debugger
        originalRequest._retry = true;

        const refreshToken = window.localStorage.getItem('refreshToken');
        return axios.post(baseURL + `/auth/refresh-token/`, {refreshToken})
            .then(({data}) => {
                window.localStorage.setItem('accessToken', data.accessToken);
                window.localStorage.setItem('refreshToken', data.refreshToken);
                apiUserRequest.defaults.headers['Authorization'] = data.accessToken;
                originalRequest.headers['Authorization'] = data.accessToken;
                return apiUserRequest(originalRequest);
            })
            .catch(error => {
                window.localStorage.clear()
                window.location.reload()
            });
    }

    return Promise.reject(error);
});

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
    },
    refresh() {
        const refreshToken = window.localStorage.getItem('refreshToken');

        return axios.post(baseURL + `/auth/refresh-token/`, {refreshToken})
            .then(({data}) => {
                window.localStorage.setItem('accessToken', data.accessToken);
                window.localStorage.setItem('refreshToken', data.refreshToken);
                apiUserRequest.defaults.headers['Authorization'] = data.accessToken;
            })
            .catch(error => {
                window.localStorage.clear()
                window.location.reload()
            });
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

export const promoAPI = {
    getPromos() {
        return axios.get<Array<promoType>>(baseURL + `/promos/`)
            .then(response => {
                return response
            })
    },
    getPromoById(id: string) {
        return axios.get<promoType>(baseURL + `/promos/${id}`)
            .then(response => {
                return response
            })
    }
}

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
    postOrder(order: IOrder) {
        return axios.post(baseURL + `/orders/`, order)
            .then(response => {
                return response
            })
    }
};

export const newsAPI = {
    getNews(page = 1) {
        return axios.get(baseURL + `/news/?page=${page}`)
            .then(response => {
                return response
            })
    },
    getNewsById(id: string) {
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
        return apiUserRequest.post(`/reviews/`, review)
            .then(response => {
                return response
            })
            .catch(e => console.log(e))
    }
}
