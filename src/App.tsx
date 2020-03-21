import React from 'react';
import './assets/main.scss';
import FooterContainer from "./components/Footer/FooterContainer";
import {BrowserRouter, Route} from 'react-router-dom';
import HeaderContainer from "./components/Header/HeaderContainer";
import MenuContainer from "./components/Menu/MenuContainer";
import ContactsContainer from "./components/Contacts/ContactsContainer";
import VacanciesContainer from "./components/Vacancancies/VacanciesContainer";
import GalleryContainer from "./components/Gallery/GalleryContainer";
import OrderContainer from "./components/Order/OrderContainer";
import NewsContainer from "./components/News/NewsContainer";
import HomeContainer from "./components/Home/HomeContainer";
import ButtonBucket from "./components/common/elements/ButtonBucket";
import BucketContainer from "./components/Bucket/BucketContainer";

function App() {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <HeaderContainer />
                <ButtonBucket />
                <div className='app-wrapper-content'>
                    <div className='page'>
                        <Route exact path='/' component={HomeContainer} />
                        <Route path='/menu' component={MenuContainer} />
                        <Route exact path='/contacts' component={ContactsContainer} />
                        <Route exact path='/vacancies' component={VacanciesContainer} />
                        <Route exact path='/gallery' component={GalleryContainer} />
                        <Route exact path='/order' component={OrderContainer} />
                        <Route exact path='/news' component={NewsContainer} />
                        <Route exact path='/bucket' component={BucketContainer} />
                    </div>
                </div>
                <FooterContainer />
            </div>
        </BrowserRouter>
    );
}

export default App;
