import React, { useEffect } from 'react'
import SectionMenu from './Menu/SectionMenu'
import SectionAbout from './About/SectionAbout'
import SectionPromo from './Promo/SectionPromo'
import SectionMap from './Map/SectionMap'
import SectionPDFMenu from './PDFMenu/SectionPDFMenu'
import { isProduction } from '../../utils';
import Tour from './Tour';
import MenuGallery from './MenuGallery';


const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = 'Три Холма'
    }, [])

    return (
        <main>
            <SectionAbout/>
            <SectionPDFMenu />
            <Tour />
            <MenuGallery />
            {!isProduction() && <SectionMenu/>}
            <SectionPromo />
            {/*<SectionDelivery contacts={contacts}/>*/}
            <SectionMap/>
        </main>
    )
}

export default Home
