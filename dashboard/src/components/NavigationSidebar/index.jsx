import React from 'react'
import { NavLink } from 'react-router-dom'
import { Accordion } from 'react-bootstrap'
import CustomToggle from '../common/element/Toggle'

const NavigationSidebar = () => (
  <nav className="navbar">
    <Accordion className="navbar-accordion">
      <CustomToggle className="navbar-accordion-header" eventKey="0">
        Ресторан
      </CustomToggle>
      <Accordion.Collapse eventKey="0">
        <NavLink activeClassName="-active" className="navbar-accordion-header-item"
                 to="/news"
        >Новости</NavLink>
      </Accordion.Collapse>
      <Accordion.Collapse eventKey="0">
        <NavLink activeClassName="-active" className="navbar-accordion-header-item"
                 to="/menu"
        >Меню</NavLink>
      </Accordion.Collapse>
      <Accordion.Collapse eventKey="0">
        <NavLink activeClassName="-active" className="navbar-accordion-header-item"
                 to="/categories"
        >Категории</NavLink>
      </Accordion.Collapse>
      {/*
                <Accordion.Collapse eventKey="0">
                    <NavLink activeClassName='-active' className='navbar-accordion-header-item' to='/bar'>Бар</NavLink>
                </Accordion.Collapse>
                */}
      {/*<Accordion.Collapse eventKey="0">*/}
      {/*  <NavLink activeClassName="-active" className="navbar-accordion-header-item" to="/halls">Банкетные*/}
      {/*    залы</NavLink>*/}
      {/*</Accordion.Collapse>*/}
      <Accordion.Collapse eventKey="0">
        <NavLink activeClassName="-active" className="navbar-accordion-header-item"
                 to="/employees"
        >Сотрудники</NavLink>
      </Accordion.Collapse>
      <Accordion.Collapse eventKey="0">
        <NavLink activeClassName="-active" className="navbar-accordion-header-item"
                 to="/vacancies"
        >Вакансии</NavLink>
      </Accordion.Collapse>
      <Accordion.Collapse eventKey="0">
        <NavLink activeClassName="-active" className="navbar-accordion-header-item"
                 to="/contacts"
        >Контакты</NavLink>
      </Accordion.Collapse>

      <CustomToggle className="navbar-accordion-header" eventKey="1">
        Доставка
      </CustomToggle>
      <Accordion.Collapse eventKey="1">
        <NavLink activeClassName="-active" className="navbar-accordion-header-item"
                 to="/delivery"
        >Заказы</NavLink>
      </Accordion.Collapse>
      <Accordion.Collapse eventKey="1">
        <NavLink activeClassName="-active" className="navbar-accordion-header-item" to="/delivery-settings">Настройки
          доставки</NavLink>
      </Accordion.Collapse>

      <CustomToggle className="navbar-accordion-header" eventKey="2">
        Посетители
      </CustomToggle>
      <Accordion.Collapse eventKey="2">
        <NavLink activeClassName="-active" className="navbar-accordion-header-item" to="/users">Все
          посетители</NavLink>
      </Accordion.Collapse>
      <Accordion.Collapse eventKey="2">
        <NavLink activeClassName="-active" className="navbar-accordion-header-item"
                 to="/reviews"
        >Отзывы</NavLink>
      </Accordion.Collapse>
      <Accordion.Collapse eventKey="2">
        <NavLink activeClassName="-active" className="navbar-accordion-header-item"
                 to="/messages"
        >Сообщения</NavLink>
      </Accordion.Collapse>
      <Accordion.Collapse eventKey="2">
        <NavLink activeClassName="-active" className="navbar-accordion-header-item"
                 to="/resume"
        >Резюме</NavLink>
      </Accordion.Collapse>
      <Accordion.Collapse eventKey="2">
        <NavLink activeClassName="-active" className="navbar-accordion-header-item" to="/orders">Заявки на
          бронирование</NavLink>
      </Accordion.Collapse>

      <CustomToggle className="navbar-accordion-header" eventKey="3">
        Программа лояльности
      </CustomToggle>
      <Accordion.Collapse eventKey="3">
        <NavLink activeClassName="-active"
                 className="navbar-accordion-header-item"
                 to="/promos"
        >
          Акции
        </NavLink>
      </Accordion.Collapse>
      <Accordion.Collapse eventKey="3">
        <NavLink activeClassName="-active"
                 className="navbar-accordion-header-item"
                 to="/bonus"
        >
          Бонусная система
        </NavLink>
      </Accordion.Collapse>
      <Accordion.Collapse eventKey="3">
        <NavLink activeClassName="-active"
                 className="navbar-accordion-header-item"
                 to="/sales"
        >
          Скидочная система
        </NavLink>
      </Accordion.Collapse>
      <Accordion.Collapse eventKey="3">
        <NavLink activeClassName="-active"
                 className="navbar-accordion-header-item"
                 to="/settings-loyalty"
        >
          Настройка системы лояльности
        </NavLink>
      </Accordion.Collapse>

      <CustomToggle className="navbar-accordion-header" eventKey="4">
        Склад
      </CustomToggle>
      <Accordion.Collapse eventKey="4">
        <NavLink activeClassName="-active" className="navbar-accordion-header-item"
                 to="/leftovers"
        >Остатки</NavLink>
      </Accordion.Collapse>

      <CustomToggle className="navbar-accordion-header" eventKey="5">
        Администраторы
      </CustomToggle>
      <Accordion.Collapse eventKey="5">
        <NavLink activeClassName="-active" className="navbar-accordion-header-item"
                 to="/admin"
        >Администраторы</NavLink>
      </Accordion.Collapse>
      <Accordion.Collapse eventKey="5">
        <NavLink activeClassName="-active" className="navbar-accordion-header-item" to="/access-templates">Шаблоны
          доступа</NavLink>
      </Accordion.Collapse>

      {/*<CustomToggle className="navbar-accordion-header" eventKey="6">*/}
      {/*  Статистика и отчеты*/}
      {/*</CustomToggle>*/}
      {/*<Accordion.Collapse eventKey="6">*/}
      {/*  <NavLink activeClassName="-active" className="navbar-accordion-header-item"*/}
      {/*           to="/average_check"*/}
      {/*  >Средний чек</NavLink>*/}
      {/*</Accordion.Collapse>*/}
    </Accordion>
  </nav>
)

export default NavigationSidebar
