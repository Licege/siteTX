import React from 'react'
import { contactsType, reviewType } from '../../types/types'
import { ConnectWithUs } from './ConnectWithUs/ConnectWithUs'
import { Address } from './Address'
import { AboutUs } from './AboutUs'

type PropsType = {
    contacts: contactsType

    postForm: ( data: reviewType ) => void
}

const Contacts: React.FC<PropsType> = ( {contacts, postForm} ) => {
    return (
        <main className='page-container'>
            <AboutUs/>
            <Address contacts={contacts}/>
            <ConnectWithUs postForm={postForm}/>
        </main>
    )
}

export default Contacts
