import React from 'react';
import {NavLink} from "react-router-dom";

const ButtonBucket = () => {
    return (
        <div className='bucket'>
            <NavLink exact activeClassName='-active' className='header-navbar-item' to='/bucket'>Корзина</NavLink>
        </div>
    )
};

export default ButtonBucket;