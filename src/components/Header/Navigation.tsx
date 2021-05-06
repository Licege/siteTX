import React from 'react'
import { NavLink } from 'react-router-dom'

interface IProps {
  phone: string
}

const Navigation: React.FC<IProps> = ({ phone }) => (
  <nav className='header-navbar'>
    <ul>
      <li>
        <NavLink exact activeClassName='-active' className='header-navbar-item' to='/'>ГЛАВНАЯ</NavLink>
      </li>
      {/*<li>*/}
      {/*  <NavLink activeClassName='-active' className='header-navbar-item' to='/menu'>МЕНЮ</NavLink>*/}
      {/*</li>*/}
      <li>
        <NavLink activeClassName='-active' className='header-navbar-item' to='/news'>СОБЫТИЯ</NavLink>
      </li>
      <li>
        <a href={`tel:${phone}`}>ЗАКАЗ СТОЛОВ</a>
        {/*<NavLink activeClassName='-active' className='header-navbar-item' to='/order'>ЗАКАЗ СТОЛОВ</NavLink>*/}
      </li>
      <li>
        <NavLink activeClassName='-active' className='header-navbar-item' to='/contacts'>О НАС</NavLink>
      </li>
    </ul>
  </nav>
)

export default Navigation;