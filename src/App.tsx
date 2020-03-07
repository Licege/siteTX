import React from 'react';
import './assets/main.scss';
import FooterContainer from "./components/Footer/FooterContainer";
import {BrowserRouter, Route} from 'react-router-dom';
import HeaderContainer from "./components/Header/HeaderContainer";
import MenuContainer from "./components/Menu/MenuContainer";

function App() {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <div className='app-wrapper-content'>
                    <HeaderContainer />
                    <Route exact path='/menu' component={MenuContainer} />
                    <FooterContainer />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
