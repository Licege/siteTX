// import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
// import thunkMiddleWare from 'redux-thunk'
// import contactsReducer from './reducers/contacts.reducer'
// import menuReducer from './reducers/menu.reducer'
// import vacanciesReducer from './reducers/vacancies.reducer'
// import NewsReducer from './reducers/news.reducer'
// import bucketReducer from './reducers/bucket.reducer'
// import { reducer as formReducer } from 'redux-form'
// import { persistReducer, persistStore } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// import reviewsReducer from './reducers/reviews.reducer'
// import authReducer from './reducers/auth.reducer'
// import promosReducer from './reducers/promos.reducer'
// import appReducer from './reducers/app.reducer'
// import profileReducer from './reducers/profile.reducer'
// import complainReducer from './reducers/complain.reducer'
//
// const persistConfig = {
//     key: 'bucket',
//     storage,
//     whitelist: ['bucket'],
// }
//
// let rootReducer = combineReducers({
//     authPage: authReducer,
//     menuPage: menuReducer,
//     vacanciesPage: vacanciesReducer,
//     newsPage: NewsReducer,
//     contacts: contactsReducer,
//     bucket: bucketReducer,
//     reviewsPage: reviewsReducer,
//     promosPage: promosReducer,
//     profilePage: profileReducer,
//     complainPage: complainReducer,
//     app: appReducer,
//     form: formReducer,
// })
//
// const persistedReducer = persistReducer(persistConfig, rootReducer)
//
// type RootReducerType = typeof rootReducer;
// export type AppStateType = ReturnType<RootReducerType>
//
// type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
// export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>
//
// const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)))
// export const persistor = persistStore(store)
//
// export default () => {
//     return { store, persistor }
// };

import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux";
import appReducer from './reducers/app.reducer'
import authReducer from './reducers/auth.reducer'
import profileReducer from './reducers/profile.reducer'
import contactsReducer from './reducers/contacts.reducer'
import menuReducer from './reducers/menu.reducer'
import bucketReducer from './reducers/bucket.reducer'
import NewsReducer from './reducers/news.reducer'
import promosReducer from './reducers/promos.reducer'

const store = configureStore({
    reducer: {
        app: appReducer,
        authPage: authReducer,
        profilePage: profileReducer,
        contacts: contactsReducer,
        menuPage: menuReducer,
        bucket: bucketReducer,
        newsPage: NewsReducer,
        promosPage: promosReducer,
    },
    middleware: (getDefaultMiddleware =>
      getDefaultMiddleware()
        .prepend()
    )
})

export type AppStateType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store