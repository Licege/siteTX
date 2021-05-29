import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, NavItem } from './styles'

const Navigation = () => (
  <Navbar>
    <ul>
      <li>
        <NavItem exact activeClassName='active' to='/'>ГЛАВНАЯ</NavItem>
      </li>
      <li>
        <NavItem activeClassName='active' to='/menu'>МЕНЮ</NavItem>
      </li>
      <li>
        <NavItem activeClassName='active' to='/news'>СОБЫТИЯ</NavItem>
      </li>
      <li>
        <NavItem activeClassName='active' to='/order'>ЗАКАЗ СТОЛОВ</NavItem>
      </li>
      <li>
        <NavItem activeClassName='active' to='/contacts'>О НАС</NavItem>
      </li>
    </ul>
  </Navbar>
)

export default Navigation;