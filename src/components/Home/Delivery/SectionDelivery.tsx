import React from 'react'
import {contactsType} from "../../../types/types";
import {Link} from "react-router-dom";

interface IProps {
    contacts: contactsType
}

const SectionDelivery: React.FC<IProps> = ({contacts}) => (
    <div className='Section-delivery'>
        <div className='Section-delivery-header'>Условия доставки</div>
        <div className='Section-delivery-info'>Все об оплате и получении заказа</div>
        <div className='Section-delivery-order'>
            Заказ блюд по телефону:
            <a href={`tel:${contacts.phone}`} className='Section-delivery-order-phone'> {contacts.phone} </a>
            или на
            <Link to='/menu' className='Section-delivery-order-link'> сайте</Link>
        </div>
    </div>
)

export default SectionDelivery;