import React from 'react'
import { NavLink as NavL } from 'react-router-dom'
import { Accordion } from 'react-bootstrap'
import CustomToggle from '../common/element/Toggle'

const NavigationSidebar = () => (
  <nav className="navbar">
    <Accordion className="navbar-accordion">
      <MainSection />
        <DeliverySection />
        <ClientsSection />
        <LoyaltySection />
        <StorageSection />
        <AdminsSection />
    </Accordion>
  </nav>
)

const Toggle = ({ eventKey, title }) => (
  <CustomToggle className="navbar-accordion-header" eventKey={eventKey}>{title}</CustomToggle>
)

const NavLink = ({ eventKey, to, title }) => (
  <Accordion.Collapse eventKey={eventKey}>
    <NavL activeClassName="-active" className="navbar-accordion-header-item" to={to}>{title}</NavL>
  </Accordion.Collapse>
)

const MainSection = () => (
  <>
    <Toggle eventKey='0' title='Ресторан' />
    <NavLink eventKey='0' to='/news' title='Новости' />
    <NavLink eventKey='0' to='/menu' title='Меню' />
    <NavLink eventKey='0' to='/categories' title='Категории' />
    <NavLink eventKey='0' to='/employees' title='Сотрудники' />
    <NavLink eventKey='0' to='/vacancies' title='Вакансии' />
    <NavLink eventKey='0' to='/contacts' title='Контакты' />
    {/*
                <Accordion.Collapse eventKey="0">
                    <NavLink activeClassName='-active' className='navbar-accordion-header-item' to='/bar'>Бар</NavLink>
                </Accordion.Collapse>
                */}
    {/*<Accordion.Collapse eventKey="0">*/}
    {/*  <NavLink activeClassName="-active" className="navbar-accordion-header-item" to="/halls">Банкетные*/}
    {/*    залы</NavLink>*/}
    {/*</Accordion.Collapse>*/}
  </>
)

const DeliverySection = () => (
  <>
    <Toggle eventKey='1' title='Доставка' />
    <NavLink eventKey='1' to='/delivery' title='Заказы' />
    <NavLink eventKey='1' to='/delivery-settings' title='Настройки доставки' />
  </>
)

const ClientsSection = () => (
  <>
    <Toggle eventKey='2' title='Посетители' />
    <NavLink eventKey='2' to='/users' title='Все посетители' />
    <NavLink eventKey='2' to='/feedback' title='Отзывы' />
    <NavLink eventKey='2' to='/messages' title='Сообщения' />
    <NavLink eventKey='2' to='/resume' title='Резюме' />
    <NavLink eventKey='2' to='/orders' title='Заявки на бронирование' />
    <NavLink eventKey='2' to='/orders' title='Заявки на бронирование' />
  </>
)

const LoyaltySection = () => (
  <>
    <Toggle eventKey='3' title='Программа лояльности' />
    <NavLink eventKey='3' to='/promos' title='Акции' />
    <NavLink eventKey='3' to='/bonus' title='Бонусная система' />
    <NavLink eventKey='3' to='/sales' title='Система скидок' />
    <NavLink eventKey='3' to='/settings-loyalty' title='Настройка системы лояльности' />
  </>
)

const StorageSection = () => (
  <>
    <Toggle eventKey='4' title='Склад' />
    <NavLink eventKey='4' to='/leftovers' title='Баланс' />
  </>
)

const AdminsSection = () => (
  <>
    <Toggle eventKey='4' title='Администраторы' />
    <NavLink eventKey='4' to='/admin' title='Администраторы' />
    <NavLink eventKey='4' to='/access-templates' title='Шаблоны доступа' />
  </>
)

const StatisticsSection = () => (
  <>
    <Toggle eventKey='5' title='Статистика и отчеты' />
    <NavLink eventKey='5' to='/average_check' title='Средний чек' />
  </>
)

export default NavigationSidebar
