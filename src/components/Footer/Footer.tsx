import React from 'react'
import {contactsType} from "../../types/types";
import vk from '../../static/img/vk.svg';
import instagram from '../../static/img/instagram.svg';
import fb from '../../static/img/fb.svg';
import tw from '../../static/img/tw.svg';
import tg from '../../static/img/tg.svg';
import gmail from '../../static/img/gmail.svg';
import phone from '../../static/img/phone.svg';
import address from '../../static/img/address.svg';
import hours from '../../static/img/hours.svg';
import {NavLink} from "react-router-dom";

type PropsType = {
    contacts: contactsType | null
}

const Footer: React.FC<PropsType>  = ( {contacts} ) => {
    return (
        <div className='footer card-body' id='footer'>
            <div className='row'>
                <div className='col'>
                    <span className='footer-title'><img className='footer-icon' src={hours} alt=''/> Часы работы</span>
                    {contacts?.openHours?.map(item => <div>{item}</div>)}
                    <div className='footer-social'>
                        {contacts && contacts.vk ? <a className='footer-social-link' href={contacts.vk} target='_blank' rel="noopener noreferrer"><img src={vk} alt='vk' /></a> : ''}
                        {contacts && contacts.inst ? <a className='footer-social-link' href={contacts.inst} target='_blank' rel="noopener noreferrer"><img src={instagram} alt='instagram' /></a> : ''}
                        {contacts && contacts.fb ? <a className='footer-social-link' href={contacts.fb} target='_blank' rel="noopener noreferrer"><img src={fb} alt='facebook' /></a> : ''}
                        {contacts && contacts.tg ? <a className='footer-social-link' href={contacts.tg} target='_blank' rel="noopener noreferrer"><img src={tg} alt='telegram' /></a> : ''}
                        {contacts && contacts.google ? <a className='footer-social-link' href={contacts.google} target='_blank' rel="noopener noreferrer"><img src={gmail} alt='mail' /></a> : ''}
                        {contacts && contacts.tw ? <a className='footer-social-link' href={contacts.tw} target='_blank' rel="noopener noreferrer"><img src={tw} alt='twitter' /></a> : ''}
                    </div>
                </div>
                <div className='col'>
                    <span className='footer-title'>Адрес</span>
                    {contacts ?
                    <div className='footer-address'>
                            <a
                                href='https://yandex.ru/maps/22/kaliningrad/?from=api-maps&ll=20.366668%2C54.649906&mode=routes&origin=jsapi_2_1_76&rtext=~54.649946%2C20.366788&rtt=auto&ruri=~&z=17'
                                target='_blank'
                            >
                                <img src={address} alt=''/>{contacts.address}
                            </a>
                    </div>: ''}
                    {contacts && contacts.phone ? <a className='footer-phone' href={"tel:"+contacts.phone}><img src={phone} alt='' /> {contacts.phone}</a> : ''}
                </div>
                <div className='col'>
                    <div className='footer-navbar'>
                        <NavLink activeClassName='-active' className='footer-navbar-item' to='/actions'>Акции</NavLink>
                        <NavLink activeClassName='-active' className='footer-navbar-item' to='/banquets'>Банкеты</NavLink>
                        <NavLink activeClassName='-active' className='footer-navbar-item' to='/vacancies'>Вакансии</NavLink>
                        <NavLink activeClassName='-active' className='footer-navbar-item' to='/news'>Новости</NavLink>
                        <NavLink activeClassName='-active' className='footer-navbar-item' to='/gallery'>Фотогалерея</NavLink>
                        <NavLink activeClassName='-active' className='footer-navbar-item' to='/reviews'>Отзывы</NavLink>
                    </div>
                </div>
            </div>
            <div>© Три холма 2020</div>
        </div>
    )
};

export default Footer;