import React from 'react'
import {contactsType, dishType, newsType, promoType} from "../../types/types"
import SectionMenu from "./Menu/SectionMenu"
import SectionAbout from "./About/SectionAbout"
import SectionPromo from "./Promo/SectionPromo"
import SectionDelivery from "./Delivery/SectionDelivery"
import SectionMap from "./Map/SectionMap"

type PropsType = {
    news: Array<newsType>
    menu: Array<dishType>
    promos: Array<promoType>
    contacts: contactsType

    addDishToBucket: (dish: dishType) => void
}

const Home: React.FC<PropsType> = ({news, menu, promos, contacts, addDishToBucket}) => {
    // let url = "http://navse360.ru/onlyTour/4421"
    return (
        <div className='Home'>
            <SectionAbout />
            <SectionMenu menu={menu} addDishToBucket={addDishToBucket} />
            <SectionPromo promos={promos} />
            <SectionDelivery contacts={contacts} />
            <SectionMap />
        </div>
    )
};

export default Home;
