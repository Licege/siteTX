import React from 'react';
import {categoryType, dishType, orderDishType} from '../../types/types';
import CardDish from "../common/elements/CardDish";
import {NavLink} from "react-router-dom";

type PropsType = {
    menu: Array<dishType>,
    categories: Array<categoryType>
    order: Array<orderDishType>

    addToBucket: (dish: dishType) => void
    increaseCountDish: (dish: dishType) => void
    reduceCountDish: (dish: dishType) => void
}

const Menu: React.FC<PropsType> = ( {menu, categories, order, addToBucket, increaseCountDish, reduceCountDish} ) => {
    console.log(menu);
    return (
                <div className='menu'>
                    <div className='menu-categories' id='menu-categories-navbar'>
                        <div className='menu-categories-title'>Категории</div>
                        <div className='menu-categories-content'>
                            {categories.map((category) =>
                                <NavLink activeClassName='-active' className='menu-categories-content-item'
                                         to={'/menu/' + category.title_en} key={category._id}>{category.title}</NavLink>
                            )}
                        </div>
                    </div>

                    {menu.length ?
                        <div className='menu-wrapper'>
                            <div className='menu-wrapper-header'>~ Меню ~</div>
                            <div className='menu-wrapper-content'>
                                {menu.map((dish) => <CardDish dish={dish}
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
};

export default Menu;