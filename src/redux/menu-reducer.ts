import {categoryType, dishType} from "../types/types";
import {menuAPI} from "../api/api";

const GET_MENU = 'MENU/GET_MENU';
const GET_DISH = 'MENU/GET_DISH';
const FILTER_MENU = 'MENU/FILTER_MENU';
const GET_CATEGORIES = 'MENU/GET_CATEGORIES';


let initialState = {
    dish: {},
    menu: [] as Array<dishType>,
    filteredMenu: [] as Array<dishType>,
    categories: [] as Array<categoryType>
};

type InitialStateType = typeof initialState;

const menuReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case GET_MENU:
            return { ...state, menu: action.menu, filteredMenu: action.menu };
        case GET_DISH:
            return { ...state, dish: action.dish };
        case FILTER_MENU:
            return { ...state, filteredMenu: state.menu.filter(d => d.category_id === action.id)};
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
type GetDishACType = {
    type: typeof GET_DISH,
    dish: dishType
}
type FilterMenuACType = {
    type: typeof FILTER_MENU,
    id: number
}
type GetCategoriesACType = {
    type: typeof GET_CATEGORIES,
    categories: Array<categoryType>
}

type ActionType = GetMenuACType | GetDishACType | FilterMenuACType | GetCategoriesACType;

const getMenuAC = (menu: Array<dishType>): GetMenuACType => ({type: GET_MENU, menu});
const getDishAC = (dish: dishType): GetDishACType => ({type: GET_DISH, dish});
export const filterMenuAC = (id: number): FilterMenuACType => ({type: FILTER_MENU, id});
const getCategoriesACType = (categories: Array<categoryType>): GetCategoriesACType => ({type: GET_CATEGORIES, categories});

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