import React from 'react'
import { isProduction } from '../../utils';
import { Navbar, NavItem } from './styles'
import CallToUs from '../CallToUs';

const Navigation = () => (
  <Navbar>
    <ul>
      <li>
        <NavItem exact activeClassName="active" to="/">Главная</NavItem>
      </li>
      {!isProduction() && <li>
        <NavItem activeClassName="active" to="/menu">Меню</NavItem>
      </li>}
      <li>
        <NavItem activeClassName="active" to="/news">События</NavItem>
      </li>
      {!isProduction() ? <li>
        <NavItem activeClassName="active" to="/order">Заказ столов</NavItem>
      </li> : <li>
        <CallToUs text='Заказ столов' />
      </li>}
      <li>
        <NavItem activeClassName="active" to="/contacts">О нас</NavItem>
      </li>
    </ul>
  </Navbar>
)

export default Navigation;