import React, {useState} from 'react';
import {categoryType} from "../../types/types";
import {Link, NavLink} from "react-router-dom";
import ButtonBucket from "../common/elements/ButtonBucket";
import logo from "../../static/img/logo.png";
import MobileMenu from "../common/elements/MobileMenu";

type PropsType = {
    categories: Array<categoryType>
}

const Header: React.FC<PropsType> = ({categories}) => {
    const [active, setActive] = useState(false)

    const toggle = () => {
        setActive(!active)
        active ? document.body.classList.remove('scroll_block') : document.body.classList.add('scroll_block')
    }

    return (
        <div className='header'>
            <div className={active ? 'burger -active' : 'burger'} onClick={toggle} ><span/></div>
            {active && <MobileMenu categories={categories} toggle={toggle}/>}
            <Link to="/"><img className='header-logo' src={logo} alt='' /></Link>
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
            <div className='header-bucket'>
                <ButtonBucket/>
            </div>
        </div>
    )
};

export default Header;