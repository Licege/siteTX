import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { AppStateType } from '../../redux/redux-store'
import { getCategories, getDish, getMenu, getMenuByCategory } from '../../redux/thunks/menu.thunk'
import Menu from '../../components/Menu/Menu'
import { actions as bucketActions } from '../../redux/actions/bucket.actions'
import { scrollHeight } from '../../plugins/helpers'
import { categoryType, deliveryType, dishType, RouteParams } from '../../types/types'

type MapStatePropsType = {
    readonly dish: dishType | {},
    readonly menu: Array<dishType>,
    readonly categories: Array<categoryType>,
    readonly delivery: deliveryType,
    readonly mobileMenuStatus: boolean,
}
type MapDispatchPropsType = {
    getDish: (id: number) => void,
    getMenu: () => void,
    getCategories: () => void,
    getMenuByCategory: (category: number | string) => void,
    addDishToBucket: (dish: dishType) => void,
    increaseDishCount: (dish: dishType) => void,
    reduceDishCount: (dish: dishType) => void,
}
type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<RouteParams>

class MenuContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        if (!this.props.categories.length) this.props.getCategories()
        if (!this.props.match.params.id) {
            this.props.getMenu()
        } else {
            this.props.getMenuByCategory(this.props.match.params.id)
        }
        document.title = 'Меню'
        window.scrollTo(0, 0)
        window.addEventListener('scroll', this.onScroll)
    }

    componentWillUnmount(): void {
        window.removeEventListener('scroll', this.onScroll)
    }

    componentDidUpdate(prevProps: Readonly<PropsType>) {
        if (!prevProps.categories && this.props.categories.length) {
            const categoryId = this.props.categories.find(category => category.titleEn === this.props.match.params.id)!.id
            this.props.getMenuByCategory(categoryId)
        }
        if (this.props.match.params && this.props.match.params.id && prevProps.match.params.id !== this.props.match.params.id) {
            this.props.getMenuByCategory(this.props.match.params.id)
        } else if (!this.props.match.params.id && prevProps.match.params.id) {
            this.props.getMenu()
        }
    }

    onScroll = () => {
        let limit = scrollHeight() - document.documentElement.clientHeight - document.getElementById('footer')!.offsetHeight
        let navbar = document.getElementById('menu-categories-navbar')

        if (navbar) {
            if (window.pageYOffset > limit) {
                navbar.classList.add('-fixed')
                navbar.style.top = limit.toString() + 'px'
            } else if (navbar.classList.contains('-fixed')) {
                navbar.classList.remove('-fixed')
                navbar.style.top = 'auto'
            }

            if (window.pageYOffset === 0) {
                navbar.style.top = 'auto'
            }
        }
    }

    addToBucket = (dish: dishType) => {
        this.props.addDishToBucket(dish)
    }

    increaseCountDish = (dish: dishType) => {
        this.props.increaseDishCount(dish)
    }

    reduceCountDish = (dish: dishType) => {
        this.props.reduceDishCount(dish)
    }

    render() {
        let {
            menu,
            delivery,
            categories,
            mobileMenuStatus,
        } = this.props

        return <Menu menu={menu}
                     categories={categories}
                     order={delivery?.order}
                     mobileMenuStatus={mobileMenuStatus}
                     addToBucket={this.addToBucket}
                     increaseCountDish={this.increaseCountDish}
                     reduceCountDish={this.reduceCountDish}/>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dish: state.menuPage.dish,
        menu: state.menuPage.menu,
        categories: state.menuPage.categories,
        delivery: state.bucket.delivery,
        mobileMenuStatus: state.app.isOpen,
    }
}
let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
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
        getMenuByCategory: (categoryId: number | string) => {
            dispatch(getMenuByCategory(categoryId))
        },
        addDishToBucket: (dish: dishType) => {
            dispatch(bucketActions.addDish(dish))
        },
        increaseDishCount: (dish: dishType) => {
            dispatch(bucketActions.increaseDishCount(dish))
        },
        reduceDishCount: (dish: dishType) => {
            dispatch(bucketActions.reduceDishCount(dish))
        },
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(
    mapStateToProps,
    mapDispatchToProps,
)(MenuContainer)
