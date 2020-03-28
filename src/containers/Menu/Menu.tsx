import React from 'react';
import {categoryType, dishType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
import {filterMenuAC, getCategories, getDish, getMenu} from "../../redux/menu-reducer";
import {connect} from "react-redux";
import {compose} from "redux";
import Menu from "../../components/Menu/Menu";
import {addDishAC} from "../../redux/bucket-reducer";

type MapStatePropsType = {
    dish: dishType | {},
    menu: Array<dishType>,
    filteredMenu: Array<dishType>,
    categories: Array<categoryType>,
    match?: {params: {id: string}}
}
type MapDispatchPropsType = {
    getDish: (id: number) => void,
    getMenu: () => void,
    getCategories: () => void,
    addDishToBucket: (dish: dishType) => void,
    filterMenu: (id: number) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class MenuContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        if (!this.props.categories.length) this.props.getCategories();
        if (!this.props.menu.length) this.props.getMenu();
    }

    componentDidUpdate(prevProps: Readonly<MapStatePropsType & MapDispatchPropsType>) {
        if (this.props.match!.params && this.props.match!.params.id && prevProps.match!.params.id !== this.props.match!.params.id) {
            this.filterByCategory();
        }
        else if (!this.props.match!.params.id && prevProps.match!.params.id) {
            this.props.getMenu();
        }
    }

    filterByCategory = () => {
        let category_id = this.props.categories.find(c => c.title_en === this.props.match!.params.id)!.id;
        this.props.filterMenu(category_id);
    };

    addToBucket = (dish: dishType) => {
        this.props.addDishToBucket(dish);
    };

    render() {
        return <Menu menu={this.props.filteredMenu} categories={this.props.categories} addToBucket={this.addToBucket} />;
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        dish: state.menuPage.dish,
        menu: state.menuPage.menu,
        filteredMenu: state.menuPage.filteredMenu,
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
        addDishToBucket: (dish: dishType) => {
            dispatch(addDishAC(dish))
        },
        filterMenu: (id: number) => {
            dispatch(filterMenuAC(id))
        }
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps)) (MenuContainer);