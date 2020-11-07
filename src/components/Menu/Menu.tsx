import React from 'react'
import { NavLink } from 'react-router-dom'
import CardDish from '../common/elements/CardDish'
import { categoryType, dishType, orderDishType } from '../../types/types'
import Sidebar from './sidebar'

interface IProps {
    menu: Array<dishType>,
    categories: Array<categoryType>
    order: Array<orderDishType>
    mobileMenuStatus: boolean

    addToBucket: ( dish: dishType ) => void
    increaseCountDish: ( dish: dishType ) => void
    reduceCountDish: ( dish: dishType ) => void
}

type CategoriesFeedType = {
    categories: Array<categoryType>
    mobileMenuStatus: boolean
}

const CategoriesFeed = ( { categories, mobileMenuStatus }: CategoriesFeedType ): JSX.Element => (
    <ul className={'menu-feed' + (mobileMenuStatus ? '' : ' -fixed')}>
        {categories.map(category => (
            <li key={category._id}>
                <NavLink activeClassName='-active'
                         className='menu-feed-item'
                         to={'/menu/' + category.title_en}
                >
                    {category.title}
                </NavLink>
            </li>
        ))}
    </ul>
)

const Menu: React.FC<IProps> = ( {
                                     menu,
                                     categories,
                                     order,
                                     mobileMenuStatus,
                                     addToBucket,
                                     increaseCountDish,
                                     reduceCountDish,
                                 } ) => {
    return (
        <div className='menu'>
            <Sidebar categories={categories} />
            {menu.length ?
                <div className='menu-wrapper'>
                    <CategoriesFeed categories={categories} mobileMenuStatus={mobileMenuStatus} />
                    <h1 className='menu-wrapper-header'>~ Меню ~</h1>
                    <div className='menu-wrapper-content'>
                        {menu.map(( dish ) => <CardDish dish={dish}
                                                        order={order}
                                                        addToBucket={addToBucket}
                                                        increaseCountDish={increaseCountDish}
                                                        reduceCountDish={reduceCountDish}
                                                        key={dish._id}/>)}
                    </div>
                </div>
                :
                <div className='menu-empty'>К сожалению, здесь пока ничего нет :(</div>}
        </div>
    )
}

export default Menu
