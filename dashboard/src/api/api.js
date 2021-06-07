import request from '../lib/request'

const hostname = window.location.hostname
export const WS_BASE = process.env.NODE_ENV === 'production' ? `//${hostname}/` : `http://${hostname}/`

export const serverUrl = process.env.NODE_ENV === 'production' ? `//${hostname}/` : `http://${hostname}/`
const authUrl = process.env.NODE_ENV === 'production' ? `//${hostname}/api/auth` : `http://${hostname}/api/auth`
const baseUrl = serverUrl + 'api/private'
export const secret = 'dev-jwt'

export const authAPI = {
    login( user ) {
      return request.post(`${authUrl}/login/`, user)
        .then(response => response)
    },
    logout() {
       return request.get(`${authUrl}/logout/`)
         .then(response => response)
    },
    registration( user ) {
      return request.post(`${authUrl}/registration/`, user)
        .then(response => response)
    },
}

export const adminAPI = {
    getAdmins() {
        return request.get(`${baseUrl}/admin/`)
          .then(response => response)
    },
    postAdmin( id ) {
        return request.post(`${baseUrl}/admin/${id}`)
          .then(response => response)
    },
}

export const usersAPI = {
    getUsers( currentPage = 1, filters ) {
        return request.get(`${baseUrl}/users/?page=${currentPage}`, { params: filters })
          .then(response => response)
    },
    getUserById( id ) {
        return request.get(`${baseUrl}/users/${id}`)
          .then(response => response)
    },
    updateUser( profile ) {
        return request.patch(`${baseUrl}/users/${profile.id}`, profile)
          .then(response => response)
    },
}

export const employeesAPI = {
    createEmployee( profile ) {
        return request.post(`${baseUrl}/employees/`, profile)
          .then(response => response)
    },
    getEmployees() {
        return request.get(`${baseUrl}/employees/`)
          .then(response => response)
    },
    getEmployeeById( id ) {
        return request.get(`${baseUrl}/employees/${id}`)
          .then(response => response)
    },
    updateEmployee( profile ) {
        return request.put(`${baseUrl}/employees/${profile.id}`, profile)
          .then(response => response)
    },
    deleteEmployee( id ) {
        return request.delete(`${baseUrl}/employees/${id}`)
          .then(response => response)
    },
    getProfessions() {
        return request.get(`${baseUrl}/professions/`)
          .then(response => response)
    },
}

export const vacancyAPI = {
    getVacancies() {
        return request.get(`${baseUrl}/vacancies/`)
          .then(response => response)
          .catch(reason => console.error(reason))
    },
    getVacancy( id ) {
        return request.get(`${baseUrl}/vacancies/${id}`)
          .then(response => response)
    },
    createVacancy( vacancy ) {
        return request.post(`${baseUrl}/vacancies/`, vacancy)
          .then(response => response)
    },
    updateVacancy( vacancy, id ) {
        return request.patch(`${baseUrl}/vacancies/${id}`, vacancy)
          .then(response => response)
    },
    deleteVacancy( id ) {
        return request.delete(`${baseUrl}/vacancies/${id}`)
          .then(response => response)
    },
}

export const contactsAPI = {
    getContacts() {
        return request.get(`${baseUrl}/contacts/`)
          .then(response => response)
    },
    updateContacts( contacts ) {
        return request.patch(`${baseUrl}/contacts/${contacts.id}`, contacts)
          .then(response => response)
    },
}

export const promoAPI = {
    getPromos() {
        return request.get(`${baseUrl}/promos/`)
          .then(response => response)
    },
    getPromo( id ) {
        return request.get(`${baseUrl}/promos/${id}`)
          .then(response => response)
    },
    postPromo( promo ) {
        return request.post(`${baseUrl}/promos/`, promo)
          .then(response => response)
    },
    updatePromo( promo, id ) {
        return request.patch(`${baseUrl}/promos/${id}`, promo)
          .then(response => response)
    },
}

export const menuAPI = {
    createDish( dish ) {
        return request.post(`${baseUrl}/menu/`, dish)
          .then(response => response)
    },
    getDishes() {
        return request.get(`${baseUrl}/menu/`)
          .then(response => response)
    },
    getDishesByCategory( category ) {
        return request.get(`${baseUrl}/menu/${category}`)
          .then(response => response)
    },
    getDish( id ) {
        return request.get(`${baseUrl}/menu/dish/${id}`)
          .then(response => response)
    },
    updateDish( dish, id ) {
        return request.patch(`${baseUrl}/menu/${id}`, dish)
          .then(response => response)
    },
    deleteDish( id ) {
        return request.delete(`${baseUrl}/menu/${id}`)
          .then(response => response)
    },
    getCategories() {
        return request.get(`${baseUrl}/categories/`)
          .then(response => response)
    },
    getCategory( id ) {
        return request.get(`${baseUrl}/categories/${id}`)
          .then(response => response)
    },
    createCategory( category ) {
        return request.post(`${baseUrl}/categories/`, category)
          .then(response => response)
    },
    updateCategory( category ) {
        return request.patch(`${baseUrl}/categories/${category.id}`, category)
          .then(response => response)
    },
    deleteCategory( id ) {
        return request.delete(`${baseUrl}/categories/${id}`)
          .then(response => response)
    },
}

export const newsAPI = {
    getNews() {
        return request.get(`${baseUrl}/news/`)
          .then(response => response)
    },
    getCurrentNews( id ) {
        return request.get(`${baseUrl}/news/${id}`)
          .then(response => response)
    },
    postNews( news ) {
        return request.post(`${baseUrl}/news/`, news)
          .then(response => response)
    },
    updateNews( news, id ) {
        return request.patch(`${baseUrl}/news/${id}`, news)
          .then(response => response)
    },
    deleteNews( id ) {
        return request.delete(`${baseUrl}/news/${id}`)
          .then(response => response)
    },
}

export const ordersAPI = {
    getOrders() {
        return request.get(`${baseUrl}/orders/`)
          .then(response => response)
          .catch(reason => console.error(reason))
    },
}

export const reviewsAPI = {
    getReviews() {
        return request.get(`${baseUrl}/reviews/`)
          .then(response => response)
          .catch(reason => console.error(reason))
    },
    getReview( id ) {
        return request.get(`${baseUrl}/reviews/${id}`)
          .then(response => response)
          .catch(reason => console.error(reason))
    },
    updateReview( review ) {
        return request.patch(`${baseUrl}/reviews/${review.id}`, review)
          .then(response => response)
          .catch(reason => console.error(reason))
    },
}

export const messagesAPI = {
    getMessages() {
        return request.get(`${baseUrl}/messages/`)
          .then(response => response)
          .catch(reason => console.error(reason))
    },
    getMessage( id ) {
        return request.get(`${baseUrl}/messages/${id}`)
          .then(response => response)
          .catch(reason => console.error(reason))
    },
    deleteMessage( id ) {
        return request.delete(`${baseUrl}/messages/${id}`)
          .then(response => response)
          .catch(reason => console.error(reason))
    },
}

export const deliveryAPI = {
    getOrders( filter, page ) {
        return request.get(`${baseUrl}/delivery/?offset=${page}`, null, { params: filter })
          .then(response => response)
          .catch(reason => console.error(reason))
    },
    getOrderById( id ) {
        return request.get(`${baseUrl}/delivery/${id}`)
          .then(response => response)
          .catch(reason => console.error(reason))
    },
    updateOrder( order ) {
        return request.patch(`${baseUrl}/delivery/${order.id}`, order)
          .then(response => response)
          .catch(reason => console.error(reason))
    },
}

export const deliverySettingsAPI = {
    getSettings() {
        return request.get(`${baseUrl}/delivery-settings/common/`)
          .then(response => response)
          .catch(reason => console.error(reason))
    },
    getSettingsById( id ) {
        return request.get(`${baseUrl}/delivery-settings/common/${id}`)
          .then(response => response)
          .catch(reason => console.error(reason))
    },
    updateSettings( settings ) {
        return request.patch(`${baseUrl}/delivery-settings/common/${settings.id}`, settings)
          .then(response => response)
          .catch(reason => console.error(reason))
    },
    createSettings( settings ) {
        return request.post(`${baseUrl}/delivery-settings/common/`, settings)
          .then(response => response)
          .catch(reason => console.error(reason))
    },
    deleteSettings( id ) {
        return request.delete(`${baseUrl}/delivery-settings/common/${id}`)
          .then(response => response)
          .catch(reason => console.error(reason))
    },
}

export const deliveryGlobalSettingsAPI = {
    getSettings() {
        return request.get(`${baseUrl}/delivery-settings/global/`)
          .then(response => response)
          .catch(reason => console.error(reason))
    },
    updateSettings( settings ) {
        return request.patch(`${baseUrl}/delivery-settings/global/${settings.id}`, settings)
          .then(response => response)
          .catch(reason => console.error(reason))
    },
}

export const banquetHallsAPI = {
    getHalls() {
        return request.get(`${baseUrl}/banquet-hall/`)
          .then(response => response)
          .catch(reason => console.error(reason))
    },
    getHall( id ) {
        return request.get(`${baseUrl}/banquet-hall/${id}`)
          .then(response => response)
          .catch(reason => console.error(reason))
    },
    createHall( hall ) {
        return request.get(`${baseUrl}/banquet-hall/`, hall)
          .then(response => response)
          .catch(reason => console.error(reason))
    },
    updateHall( hall ) {
        return request.patch(`${baseUrl}/banquet-hall/${hall.id}`, hall)
          .then(response => response)
          .catch(reason => console.error(reason))
    },
    deleteHall( id ) {
        return request.delete(`${baseUrl}/banquet-hall/${id}`)
          .then(response => response)
          .catch(reason => console.error(reason))
    },
}

export const fileAPI = {
    uploadFile( file ) {
        return request.post(`${baseUrl}/file/`, file)
          .then(response => response)
    },
}

export const averageChecksAPI = {
    getAverageChecks( filter ) {
        return request.get(`${baseUrl}/statistics/average-checks/`, { params: filter })
          .then(response => response)
          .catch(reason => console.error(reason))
    },
}
