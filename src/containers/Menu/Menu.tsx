import React from 'react';
import {categoryType, dishType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
import {getCategories, getDish, getMenu, getMenuByCategory} from "../../redux/menu-reducer";
import {connect} from "react-redux";
import {compose} from "redux";
import Menu from "../../components/Menu/Menu";
import {addDishAC} from "../../redux/bucket-reducer";
import {scrollHeight} from "../../plugins/helpers";

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
        window.addEventListener("scroll", this.onScroll)
    }

    componentWillUnmount(): void {
        window.removeEventListener("scroll", this.onScroll)
    }

    componentDidUpdate(prevProps: Readonly<MapStatePropsType & MapDispatchPropsType>) {
        if (this.props.match!.params && this.props.match!.params.id && prevProps.match!.params.id !== this.props.match!.params.id) {
            this.props.getMenuByCategory(this.props.match!.params.id)
        } else
        if (!this.props.match!.params.id && prevProps.match!.params.id) {
            this.props.getMenu();
        }
    }

    onScroll = () => {
        let limit = scrollHeight() - document.documentElement.clientHeight - document.getElementById('footer')!.offsetHeight
        let navbar = document.getElementById('menu-categories-navbar')!

        if (window.pageYOffset > limit) {
            navbar.classList.add('-fixed')
            navbar.style.top = limit.toString()+'px'
        }
       else if (document.getElementById('menu-categories-navbar')!.classList.contains('-fixed')) {
            navbar.classList.remove('-fixed')
            navbar.style.top = 'auto'
        }
    }

    addToBucket = (dish: dishType) => {
        this.props.addDishToBucket(dish);
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
        getMenuByCategory: (category: string) => {
            dispatch(getMenuByCategory(category))
        },
        addDishToBucket: (dish: dishType) => {
            dispatch(addDishAC(dish))
        }
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps)) (MenuContainer);