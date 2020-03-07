import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleWare from "redux-thunk";
import contactsReducer from "./contacts-reducer";
import menuReducer from "./menu-reducer";

let rootReducer = combineReducers({
    menuPage: menuReducer,
    contacts: contactsReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)));
// @ts-ignore
window._store_ = store;

export default store;
