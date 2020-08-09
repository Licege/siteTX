import React, { useEffect } from 'react'
import { reviewType } from '../../types/types'
import { ConnectWithUs } from './ConnectWithUs/ConnectWithUs'
import { Address } from './Address'
import { AboutUs } from './AboutUs'
import { useDispatch, useSelector } from 'react-redux'
import { getContactsSelector } from '../../redux/selectors/contacts'
import { getContacts } from '../../redux/contacts-reducer'


const Contacts: React.FC = () => {
    let contacts = useSelector(getContactsSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        document.title = 'О нас'
        window.scroll(0, 0)
        dispatch(getContacts())
    }, [dispatch])

    const postForm = ( data: reviewType ) => {
        data.create_at = Date.parse(new Date().toString())
    }

    return (
        <main className='page-container'>
            <AboutUs/>
            <Address contacts={contacts}/>
            <ConnectWithUs postForm={postForm}/>
        </main>
    )
}

export default Contacts
