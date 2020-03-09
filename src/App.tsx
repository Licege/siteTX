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

function App() {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <div className='app-wrapper-content'>
                    <HeaderContainer />
                    <div className='page'>
                        <Route path='/menu' component={MenuContainer} />
                        <Route exact path='/contacts' component={ContactsContainer} />
                        <Route exact path='/vacancies' component={VacanciesContainer} />
                        <Route exact path='/gallery' component={GalleryContainer} />
                        <Route exact path='/order' component={OrderContainer} />
                        <Route exact path='/news' component={NewsContainer} />
                    </div>
                    <FooterContainer />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
