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
                        <NavLink to='/'>ГЛАВНАЯ</NavLink>
                    </li>
                    <li>
                        <NavLink to='/menu'>МЕНЮ</NavLink>
                    </li>
                    <li>
                        <NavLink to='/news'>СОБЫТИЯ</NavLink>
                    </li>
                    <li>
                        <NavLink to='/order'>ЗАКАЗ СТОЛОВ</NavLink>
                    </li>
                    <li>
                        <NavLink to='/contacts'>О НАС</NavLink>
                    </li>
                    <li>
                        <NavLink to='/gallery'>ФОТОГАЛЕРЕЯ</NavLink>
                    </li>
                </ul>
            </div>

        </div>
    )
};

export default Header;