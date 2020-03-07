import React from 'react';
import {category, dish} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
import {getCategories, getDish, getMenu} from "../../redux/menu-reducer";
import {connect} from "react-redux";
import {compose} from "redux";
import Menu from "./Menu";

type MapStatePropsType = {
    dish: dish | null,
    menu: Array<dish>,
    categories: Array<category>
}
type MapDispatchPropsType = {
    getDish: (id: number) => void,
    getMenu: () => void,
    getCategories: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class MenuContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        if (!this.props.categories.length) this.props.getCategories();
        if (!this.props.menu.length) this.props.getMenu();
        console.log(this.props.categories);
        console.log(this.props.menu)
    }

    render() {
        return <Menu menu={this.props.menu} categories={this.props.categories} />;
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
        }
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps)) (MenuContainer);