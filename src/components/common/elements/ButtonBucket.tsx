import React from 'react';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import shopping_cart from "../../../static/img/shopping-cart.png";

const ButtonBucket = () => {
    const orders = useSelector((state: AppStateType) => state.bucket.delivery.order)

    return (
        <div className='shopping_cart'>
            <NavLink exact activeClassName='-active' className='header-navbar-item' to='/bucket'>
                <img src={shopping_cart} alt='Корзина'/>
                {orders.length ? <span>{orders.reduce((acc, order) => acc + order.count, 0)}</span> :''}
            </NavLink>
        </div>
    )
};

export default ButtonBucket;