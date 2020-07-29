import React from 'react'
import { contactsType } from '../../types/types'
import vk from '../../static/img/vk.svg'
import instagram from '../../static/img/instagram.svg'
import fb from '../../static/img/fb.svg'
import tw from '../../static/img/tw.svg'
import tg from '../../static/img/tg.svg'
import gmail from '../../static/img/gmail.svg'
import phone from '../../static/img/phone.svg'
import address from '../../static/img/address.svg'
import hours from '../../static/img/hours.svg'
import { NavLink } from 'react-router-dom'

type PropsType = {
    contacts: contactsType
}

const Footer: React.FC<PropsType> = ( {contacts} ) => {
    return (
        <footer className='footer card-body' id='footer'>
            <div className='footer__wrapper'>
                <div className='footer__info_block'>
                    <div className='footer__work_time'>
                        <span className='footer__title'><img className='footer__icon' src={hours}
                                                             alt=''/> Часы работы</span>
                        {contacts?.openHours?.map(( item, key ) => <div key={key}>{item}</div>)}
                    </div>
                    <div className='footer__social'>
                        {contacts && contacts.vk ?
                            <a className='footer__social-link' href={contacts.vk} target='_blank'
                               rel="noopener noreferrer"><img src={vk} alt='vk'/></a> : ''}
                        {contacts && contacts.inst ?
                            <a className='footer__social-link' href={contacts.inst} target='_blank'
                               rel="noopener noreferrer"><img src={instagram} alt='instagram'/></a> : ''}
                        {contacts && contacts.fb ?
                            <a className='footer__social-link' href={contacts.fb} target='_blank'
                               rel="noopener noreferrer"><img src={fb} alt='facebook'/></a> : ''}
                        {contacts && contacts.tg ?
                            <a className='footer__social-link' href={contacts.tg} target='_blank'
                               rel="noopener noreferrer"><img src={tg} alt='telegram'/></a> : ''}
                        {contacts && contacts.google ?
                            <a className='footer__social-link' href={contacts.google} target='_blank'
                               rel="noopener noreferrer"><img src={gmail} alt='mail'/></a> : ''}
                        {contacts && contacts.tw ?
                            <a className='footer__social-link' href={contacts.tw} target='_blank'
                               rel="noopener noreferrer"><img src={tw} alt='twitter'/></a> : ''}
                    </div>
                </div>
                <div className='footer__address_block'>
                    <span className='footer__title'>Адрес</span>
                    {contacts ?
                        <div className='footer__address'>
                            <a
                                href='https://yandex.ru/maps/22/kaliningrad/?from=api-maps&ll=20.366668%2C54.649906&mode=routes&origin=jsapi_2_1_76&rtext=~54.649946%2C20.366788&rtt=auto&ruri=~&z=17'
                                target='_blank'
                                rel="noopener noreferrer"
                            >
                                <img src={address} alt=''/>{contacts.address}
                            </a>
                        </div> : ''}
                    {contacts && contacts.phone ?
                        <a className='footer__phone' href={'tel:' + contacts.phone}><img src={phone}
                                                                                         alt=''/> {contacts.phone}
                        </a> : ''}
                </div>
                <div className='footer__nav_block'>
                    <div className='footer__navbar'>
                        <NavLink activeClassName='-active' className='footer__navbar-item'
                                 to='/actions'>Акции</NavLink>
                        <NavLink activeClassName='-active' className='footer__navbar-item'
                                 to='/banquets'>Банкеты</NavLink>
                        <NavLink activeClassName='-active' className='footer__navbar-item'
                                 to='/vacancies'>Вакансии</NavLink>
                        <NavLink activeClassName='-active' className='footer__navbar-item'
                                 to='/news'>Новости</NavLink>
                        <NavLink activeClassName='-active' className='footer__navbar-item'
                                 to='/gallery'>Фотогалерея</NavLink>
                        <NavLink activeClassName='-active' className='footer__navbar-item'
                                 to='/reviews'>Отзывы</NavLink>
                    </div>
                </div>
            </div>
            <div className='footer__copyright'>© Три холма 2020</div>
        </footer>
    )
}

export default Footer
