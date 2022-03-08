import React from 'react'
import { NavBlock, NavItem } from './styles'
import { isProduction } from '../../utils';
import { useContacts } from '../../redux/hooks/contacts.hooks';
import CallToUs from '../CallToUs';

const NavigationBlock = () => {
  useContacts()

  return (
    <NavBlock>
      <NavItem activeClassName="active" to="/actions">Акции</NavItem>
      {!isProduction()
                ? <NavItem activeClassName="active" to="/banquets">Банкеты</NavItem>
                : <CallToUs text='Заказать банкет' />
            }
      <NavItem activeClassName="active" to="/vacancies">Вакансии</NavItem>
      <NavItem activeClassName="active" to="/news">Новости</NavItem>
      {!isProduction() && <NavItem activeClassName="active" to="/gallery">Фотогалерея</NavItem>}
      <NavItem activeClassName="active" to="/complain">Ваше мнение</NavItem>
      {/* <NavLink activeClassName='-active' className='footer__navbar-item' to='/reviews'>Отзывы</NavLink> */}
    </NavBlock>
  )
}

export default NavigationBlock