import React from 'react';
import './assets/main.scss';
import FooterContainer from "./components/Footer/FooterContainer";
import {BrowserRouter, Route} from 'react-router-dom';
import HeaderContainer from "./components/Header/HeaderContainer";
import MenuContainer from "./components/Menu/MenuContainer";
import ContactsContainer from "./components/Contacts/ContactsContainer";
import VacanciesContainer from "./components/Vacancancies/VacanciesContainer";

function App() {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <div className='app-wrapper-content'>
                    <HeaderContainer />
                    <Route path='/menu' component={MenuContainer} />
                    <Route exact path='/contacts' component={ContactsContainer} />
                    <Route exact path='/vacancies' component={VacanciesContainer} />
                    <FooterContainer />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
