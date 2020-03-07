import React from 'react';
import {categoryType, dishType} from '../../types/types';
import CardDish from "../common/elements/CardDish";
import {NavLink} from "react-router-dom";

type PropsType = {
    menu: Array<dishType>,
    categories: Array<categoryType>
}

const Menu: React.FC<PropsType> = ( {menu, categories} ) => {
    return (
        <div className='page'>
            <h4 className='page-title'>~ Блюда ~</h4>
            <div className='card'>
                <div className='card-body menu'>
                    <div className='menu-categories'>
                        {categories.map((category) =>
                            <NavLink activeClassName='-active' className='menu-categories-item' to={'/menu/'+category.title_en} key={category.id}>{category.title}</NavLink>
                        )}
                    </div>
                    <div className='menu-content'>
                        {menu.map((dish) =>
                            <CardDish dish={dish} key={dish.id} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Menu;