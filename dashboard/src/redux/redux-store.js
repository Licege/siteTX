import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import authReducer from './reducers/auth.reducer'
import usersReducer from './users-reducer'
import employeesReducer from './reducers/employees.reducer'
import vacanciesReducer from './reducers/vacancies.reducer'
import promosReducer from './reducers/promos.reducer'
import contactsReducer from './reducers/contacts.reducer'
import menuReducer from './reducers/menu.reducer'
import newsReducer from './reducers/news.reducer'
import ordersReducer from './reducers/orders.reducer'
import reviewsReducer from './reviews-reducer'
import messageReducer from './message-reducer'
import toggleReducer from './reducers/toogle.reducer'
import deliveryReducer from './reducers/delivery.reducer'
import adminReducer from './admin-reducer'
import hallReducer from './hall-reducer'
import fileReducer from './file-reducer'
import averageChecksReducer from './Statistics/average-checks-reducer'
import modalReducer from './reducers/modals.reducer'

const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true
})

export default configureStore({
    middleware,
    reducer: {
        auth: authReducer,
        file: fileReducer,
        modal: modalReducer,
        contactsPage: contactsReducer,
        toggleComponent: toggleReducer,
        newsPage: newsReducer,
        vacanciesPage: vacanciesReducer,
        usersPage: usersReducer,
        employeesPage: employeesReducer,
        menuPage: menuReducer,
        promosPage: promosReducer,
        deliveryPage: deliveryReducer,
        ordersPage: ordersReducer
    }
})
