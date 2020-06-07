import React from 'react';
import {dishType, newsType} from "../../types/types";
import Loader from "../common/elements/Loader";
import SectionMenu from "./Menu/SectionMenu";
import SectionAbout from "./About/SectionAbout";
import SectionPromo from "./Promo/SectionPromo";
import SectionDelivery from "./Delivery/SectionDelivery";
import SectionMap from "./Map/SectionMap";

type PropsType = {
    news: Array<newsType>
    menu: Array<dishType>
}

const Home: React.FC<PropsType> = ({news, menu}) => {
    // let url = "http://navse360.ru/onlyTour/4421"

    return (
        <div className='Home page-container'>
            <SectionAbout/>
            <SectionPromo/>
            <SectionMenu menu={menu}/>
            <SectionDelivery/>
            <SectionMap/>
            <div>
                <Loader/>
            </div>
        </div>
    )
};

export default Home;