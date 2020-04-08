import React from 'react';
import FormContacts from './FormContacts'
import {contactsType, reviewType} from "../../types/types";

type PropsType = {
    contacts: contactsType | null

    postForm: (data: reviewType) => void
}

const Contacts: React.FC<PropsType> = ({contacts, postForm} ) => {
    return (
        <div className='page-container'>
            <h3>О нас</h3>
            <p>*Раздел "о нас"*</p>
            <h3>Свяжитесь с нами</h3>
            <p>С удовольствием ответим на все вопросы, просто заполните форму:</p>
            <FormContacts onSubmit={postForm} />
        </div>
    )
};

export default Contacts;