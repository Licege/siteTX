import React from 'react';
import './assets/main.scss';
import FooterContainer from "./containers/Footer/Footer";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import HeaderContainer from "./containers/Header/Header";
import MenuContainer from "./containers/Menu/Menu";
import ContactsContainer from "./containers/Contacts/Contacts";
import VacanciesContainer from "./containers/Vacancies/Vacancies";
import GalleryContainer from "./containers/Gallery/Gallery";
import OrderContainer from "./containers/Order/Order";
import NewsContainer from "./containers/News/News";
import HomeContainer from "./containers/Home/Home";
import ButtonBucket from "./components/common/elements/ButtonBucket";
import BucketContainer from "./containers/Bucket/Bucket";

function App() {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <HeaderContainer />
                <ButtonBucket />
                <div className='app-wrapper-content'>
                    <div className='page'>
                        <Switch>
                            <Route exact path='/' component={HomeContainer} />
                            <Route path='/menu/:id?' component={MenuContainer} />
                            <Route exact path='/contacts' component={ContactsContainer} />
                            <Route exact path='/vacancies' component={VacanciesContainer} />
                            <Route exact path='/gallery' component={GalleryContainer} />
                            <Route exact path='/order' component={OrderContainer} />
                            <Route exact path='/news' component={NewsContainer} />
                            <Route exact path='/bucket' component={BucketContainer} />
                        </Switch>
                    </div>
                </div>
                <FooterContainer />
            </div>
        </BrowserRouter>
    );
}

export default App;
