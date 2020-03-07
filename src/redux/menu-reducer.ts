import {category, dish} from "../types/types";
import {menuAPI} from "../api/api";

const GET_MENU = 'GET_MENU';
const GET_DISH = 'GET_DISH';
const GET_CATEGORIES = 'GET_CATEGORIES';


let initialState = {
    dish: null,
    menu: [],
    categories: []
};

type InitialStateType = typeof initialState;

const menuReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case GET_MENU:
            return { ...state, menu: action.menu };
        case GET_DISH:
            return { ...state, dish: action.dish };
        case GET_CATEGORIES:
            return { ...state, categories: action.categories };
        default:
            return state;
    }
};

type GetMenuACType = {
    type: typeof GET_MENU,
    menu: Array<dish>
}
type GetDishACType = {
    type: typeof GET_DISH,
    dish: dish
}
type GetCategoriesACType = {
    type: typeof GET_CATEGORIES,
    categories: Array<category>
}

const getMenuAC = (menu: Array<dish>): GetMenuACType => ({type: GET_MENU, menu});
const getDishAC = (dish: dish): GetDishACType => ({type: GET_DISH, dish});
const getCategoriesACType = (categories: Array<category>): GetCategoriesACType => ({type: GET_CATEGORIES, categories});

export const getCategories = () => async(dispatch: any) => {
    let response = await menuAPI.getCategories();
    dispatch(getCategoriesACType(response));
};

export const getMenu = () => async(dispatch: any) => {
    let response = await menuAPI.getMenu();
    dispatch(getMenuAC(response));
};

export const getDish = (id: number) => async(dispatch: any) => {
    let response = await menuAPI.getDish(id);
    dispatch(getDishAC(response));
};

export default menuReducer;