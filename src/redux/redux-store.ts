import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleWare from "redux-thunk";
import contactsReducer from "./contacts-reducer";
import menuReducer from "./menu-reducer";
import vacanciesReducer from "./vacancies-reducer";
import NewsReducer from "./news-reducer";
import bucketReducer from "./bucket-reducer";
import { reducer as formReducer } from 'redux-form'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'bucket',
    storage,
    whitelist: ['bucket']
};

let rootReducer = combineReducers({
    menuPage: menuReducer,
    vacanciesPage: vacanciesReducer,
    newsPage: NewsReducer,
    contacts: contactsReducer,
    bucket: bucketReducer,
    form: formReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)));
export const persistor = persistStore(store);
// @ts-ignore
window._store_ = store;

export default () => {
    return {store, persistor}
};