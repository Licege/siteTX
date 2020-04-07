import React from 'react';
import {categoryType, dishType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
import {getCategories, getDish, getMenu, getMenuByCategory} from "../../redux/menu-reducer";
import {connect} from "react-redux";
import {compose} from "redux";
import Menu from "../../components/Menu/Menu";
import {addDishAC} from "../../redux/bucket-reducer";

type MapStatePropsType = {
    dish: dishType | {},
    menu: Array<dishType>,
    categories: Array<categoryType>,
    match?: {params: {id: string}}
}
type MapDispatchPropsType = {
    getDish: (id: number) => void,
    getMenu: () => void,
    getCategories: () => void,
    getMenuByCategory: (category: string) => void,
    addDishToBucket: (dish: dishType) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class MenuContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        if (!this.props.categories.length) this.props.getCategories();
        if (!this.props.match!.params.id) {
            this.props.getMenu();
        } else {
            this.props.getMenuByCategory(this.props.match!.params.id)
        }
    }

    componentDidUpdate(prevProps: Readonly<MapStatePropsType & MapDispatchPropsType>) {
        if (this.props.match!.params && this.props.match!.params.id && prevProps.match!.params.id !== this.props.match!.params.id) {
            this.props.getMenuByCategory(this.props.match!.params.id)
        }
    }

    onScroll = (event: React.UIEvent<HTMLElement>) => {
        console.log(window.pageYOffset)
    }

    addToBucket = (dish: dishType) => {
        this.props.addDishToBucket(dish);
    };

    render() {
        return <Menu menu={this.props.menu} categories={this.props.categories} addToBucket={this.addToBucket} onScroll={this.onScroll} />;
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
        getMenuByCategory: (category: string) => {
            dispatch(getMenuByCategory(category))
        },
        addDishToBucket: (dish: dishType) => {
            dispatch(addDishAC(dish))
        }
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps)) (MenuContainer);