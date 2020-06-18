import React from 'react';
import {categoryType, deliveryType, dishType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
import {getCategories, getDish, getMenu, getMenuByCategory} from "../../redux/menu-reducer";
import {connect} from "react-redux";
import {compose} from "redux";
import Menu from "../../components/Menu/Menu";
import {addDishAC, increaseDishCountAC, reduceDishCountAC} from "../../redux/bucket-reducer";
import {scrollHeight} from "../../plugins/helpers";

type MapStatePropsType = {
    dish: dishType | {},
    menu: Array<dishType>,
    categories: Array<categoryType>,
    delivery: deliveryType,
    match?: {params: {id: string}}
}
type MapDispatchPropsType = {
    getDish: (id: number) => void,
    getMenu: () => void,
    getCategories: () => void,
    getMenuByCategory: (category: string) => void,
    addDishToBucket: (dish: dishType) => void
    increaseDishCount: (dish: dishType) => void
    reduceDishCount: (dish: dishType) => void
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
        document.title = 'Меню'
        window.addEventListener("scroll", this.onScroll)
    }

    componentWillUnmount(): void {
        window.removeEventListener("scroll", this.onScroll)
    }

    componentDidUpdate(prevProps: Readonly<MapStatePropsType & MapDispatchPropsType>) {
        if (!prevProps.categories && this.props.categories.length) {
            let category_id = this.props.categories.find(category => category.title_en === this.props.match!.params.id)!._id
            this.props.getMenuByCategory(category_id)
        }
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

    increaseCountDish = (dish: dishType) => {
        this.props.increaseDishCount(dish)
    }

    reduceCountDish = (dish: dishType) => {
        this.props.reduceDishCount(dish)
    }

    render() {
        return <Menu menu={this.props.menu}
                     categories={this.props.categories}
                     order={this.props.delivery?.order}
                     addToBucket={this.addToBucket}
                     increaseCountDish={this.increaseCountDish}
                     reduceCountDish={this.reduceCountDish} />;
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        dish: state.menuPage.dish,
        menu: state.menuPage.menu,
        categories: state.menuPage.categories,
        delivery: state.bucket.delivery
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
        },
        increaseDishCount: (dish: dishType) => {
            dispatch(increaseDishCountAC(dish))
        },
        reduceDishCount: (dish: dishType) => {
            dispatch(reduceDishCountAC(dish))
        }
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps)) (MenuContainer);