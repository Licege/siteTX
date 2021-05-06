import React, { useEffect } from 'react'
import ConnectWithUs from './ConnectWithUs'
import AddressBlock from './AddressBlock'
import { AboutUs } from './AboutUs'
import './style.scss'


const Contacts: React.FC = () => {
    useEffect(() => {
        document.title = 'О нас'
        window.scroll(0, 0)
    }, [])

    return (
        <main className='page-container'>
            <AboutUs/>
            <div className='contacts'>
                <AddressBlock />
                <ConnectWithUs />
            </div>
        </main>
    )
}

export default Contacts
