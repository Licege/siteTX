import React, { useEffect } from 'react'
import SectionMenu from './Menu/SectionMenu'
import SectionAbout from './About/SectionAbout'
import SectionPromo from './Promo/SectionPromo'
import SectionMap from './Map/SectionMap'
import SectionPDFMenu from './PDFMenu/SectionPDFMenu'

const Home: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = 'Три Холма'
    }, [])
    // const url = "http://navse360.ru/onlyTour/4421"

    return (
        <main className='Home'>
            <SectionAbout/>
            <SectionPDFMenu />
            <SectionMenu />
            <SectionPromo />
            {/*<SectionDelivery contacts={contacts}/>*/}
            <SectionMap/>
        </main>
    )
}

export default Home
