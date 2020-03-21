import React from 'react';
import {categoryType, dishType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
import {getCategories, getDish, getMenu} from "../../redux/menu-reducer";
import {connect} from "react-redux";
import {compose} from "redux";
import Menu from "./Menu";
import {addDishAC} from "../../redux/bucket-reducer";

type MapStatePropsType = {
    dish: dishType | null,
    menu: Array<dishType>,
    categories: Array<categoryType>
}
type MapDispatchPropsType = {
    getDish: (id: number) => void,
    getMenu: () => void,
    getCategories: () => void
    addDishToBucket: (id: number) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class MenuContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        if (!this.props.categories.length) this.props.getCategories();
        if (!this.props.menu.length) this.props.getMenu();
    }

    addToBucket = (id: number) => {
        this.props.addDishToBucket(id);
    };

    render() {
        return <Menu menu={this.props.menu} categories={this.props.categories} addToBucket={this.addToBucket} />;
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        dish: state.menuPage.dish,
        menu: state.menuPage.menu,
        categories: state.menuPage.categories
    }
};
let mapDispatchToProps = (dispatch: any) => {
    return {
        getDish: (id: number) => {
            dispatch(getDish(id))
        },
        getMenu: () => {
            dispatch(getMenu())
        },
        getCategories: () => {
            dispatch(getCategories())
        },
        addDishToBucket: (id: number) => {
            dispatch(addDishAC(id))
        }
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps)) (MenuContainer);