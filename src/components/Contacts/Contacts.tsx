import React from 'react';
import {contactsType} from "../../types/types";

type PropsType = {
    contacts: contactsType | null
}

const Contacts: React.FC<PropsType> = ({contacts} ) => {
    return (
        <div className='page-container'>
            <h3>О нас</h3>
            <p>*Раздел "о нас"*</p>
            <h3>Свяжитесь с нами</h3>
            <p>С удовольствием ответим на все вопросы, просто заполните форму:</p>
            <div>*Тут должна быть форма*</div>
        </div>
    )
};

export default Contacts;