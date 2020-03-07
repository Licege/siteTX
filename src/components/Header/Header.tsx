import React from 'react';
import {contactsType} from "../../types/types";
import {NavLink} from "react-router-dom";

type PropsType = {
    contacts: contactsType | null
}

const Header: React.FC<PropsType> = () => {
    return (
        <div className='header'>
            <div className='header-navbar'>
                <ul>
                    <li>
                        <NavLink exact activeClassName='-active' className='header-navbar-item' to='/'>ГЛАВНАЯ</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='-active' className='header-navbar-item' to='/menu'>МЕНЮ</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='-active' className='header-navbar-item' to='/news'>СОБЫТИЯ</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='-active' className='header-navbar-item' to='/order'>ЗАКАЗ СТОЛОВ</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='-active' className='header-navbar-item' to='/contacts'>О НАС</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='-active' className='header-navbar-item' to='/gallery'>ФОТОГАЛЕРЕЯ</NavLink>
                    </li>
                </ul>
            </div>

        </div>
    )
};

export default Header;