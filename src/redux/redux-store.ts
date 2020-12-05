import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunkMiddleWare from 'redux-thunk'
import contactsReducer from './contacts-reducer'
import menuReducer from './menu-reducer'
import vacanciesReducer from './vacancies-reducer'
import NewsReducer from './news-reducer'
import bucketReducer from './bucket-reducer'
import { reducer as formReducer } from 'redux-form'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reviewsReducer from './reviews-reducer'
import authReducer from './auth-reducer'
import promosReducer from './promos-reducer'
import appReducer from './app-reducer'
import profileReducer from './profile-reducer';

const persistConfig = {
    key: 'bucket',
    storage,
    whitelist: ['bucket'],
}

let rootReducer = combineReducers({
    authPage: authReducer,
    menuPage: menuReducer,
    vacanciesPage: vacanciesReducer,
    newsPage: NewsReducer,
    contacts: contactsReducer,
    bucket: bucketReducer,
    reviewsPage: reviewsReducer,
    promosPage: promosReducer,
    profilePage: profileReducer,
    app: appReducer,
    form: formReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)))
export const persistor = persistStore(store)

export default () => {
    return { store, persistor }
};
