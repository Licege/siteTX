import {categoryType, dishType} from "../types/types";
import {menuAPI} from "../api/api";

const GET_MENU = 'MENU/GET_MENU';
const GET_MENU_BY_CATEGORY = 'MENU/GET_MENU_BY_CATEGORY';
const GET_DISH = 'MENU/GET_DISH';
const FILTER_MENU = 'MENU/FILTER_MENU';
const GET_CATEGORIES = 'MENU/GET_CATEGORIES';


let initialState = {
    dish: {},
    menu: [] as Array<dishType>,
    categories: [] as Array<categoryType>
};

type InitialStateType = typeof initialState;

const menuReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case GET_MENU:
            return { ...state, menu: action.menu };
        case GET_MENU_BY_CATEGORY:
            return { ...state, menu: action.menu }
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
    menu: Array<dishType>
}
type GetMenuByCategoryACType = {
    type: typeof GET_MENU_BY_CATEGORY,
    menu: Array<dishType>
}
type GetDishACType = {
    type: typeof GET_DISH,
    dish: dishType
}
type GetCategoriesACType = {
    type: typeof GET_CATEGORIES,
    categories: Array<categoryType>
}

type ActionType = GetMenuACType | GetMenuByCategoryACType | GetDishACType | GetCategoriesACType;

const getMenuAC = (menu: Array<dishType>): GetMenuACType => ({type: GET_MENU, menu});
const getMenuByCategoryAC = (menu: Array<dishType>): GetMenuByCategoryACType => ({type: GET_MENU_BY_CATEGORY, menu})
const getDishAC = (dish: dishType): GetDishACType => ({type: GET_DISH, dish});
const getCategoriesACType = (categories: Array<categoryType>): GetCategoriesACType => ({type: GET_CATEGORIES, categories});

export const getCategories = () => async(dispatch: any) => {
    let response = await menuAPI.getCategories();
    dispatch(getCategoriesACType(response.data));
};

export const getMenu = () => async(dispatch: any) => {
    let response = await menuAPI.getMenu();
    dispatch(getMenuAC(response.data));
};

export const getMenuByCategory = (category: string) => async(dispatch: any) => {
    let response = await menuAPI.getMenuByCategory(category)
    if (!response.data){
        dispatch(getMenuByCategoryAC([]))
    } else dispatch(getMenuByCategoryAC(response.data))
}

export const getDish = (id: number) => async(dispatch: any) => {
    let response = await menuAPI.getDish(id);
    dispatch(getDishAC(response.data));
};

export default menuReducer;