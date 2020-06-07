import React from 'react';
import {connect} from "react-redux";
import './assets/main.scss';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import FooterContainer from "./containers/Footer/Footer";
import HeaderContainer from "./containers/Header/Header";
import MenuContainer from "./containers/Menu/Menu";
import ContactsContainer from "./containers/Contacts/Contacts";
import VacanciesContainer from "./containers/Vacancies/Vacancies";
import GalleryContainer from "./containers/Gallery/Gallery";
import OrderContainer from "./containers/Order/Order";
import NewsContainer from "./containers/News/News";
import NewsByIdContainer from "./containers/News/NewsById";
import HomeContainer from "./containers/Home/Home";
import BucketContainer from "./containers/Bucket/Bucket";
import ReviewsContainer from "./containers/Reviews/Reviews";
import ResumeContainer from "./containers/Vacancies/Resume/Resume"
import {AppStateType} from "./redux/redux-store";
import {refresh} from "./redux/auth-reducer";

interface IProps {
    refresh: () => void
}

class App extends React.Component<IProps> {
    componentDidMount(): void {
        if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) this.props.refresh()
    }

    render() {
        return (
            <BrowserRouter>
                <div className='app-wrapper'>
                    <HeaderContainer />
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
                                <Route exact path='/news/:id' component={NewsByIdContainer} />
                                <Route exact path='/bucket' component={BucketContainer} />
                                <Route exact path='/reviews' component={ReviewsContainer} />
                                <Route exact path='/resume/:id' component={ResumeContainer} />
                                <Route render={() => <h1 className='text-center'>Не найдено</h1>} />
                            </Switch>
                        </div>
                    </div>
                    <FooterContainer />
                </div>
            </BrowserRouter>
        );
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {}
}

let mapDispatchToProps = (dispatch: any) => {
    return {
        refresh: () => {
            dispatch(refresh())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (App)

/*function App() {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <HeaderContainer />
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
                            <Route exact path='/news/:id' component={NewsByIdContainer} />
                            <Route exact path='/bucket' component={BucketContainer} />
                            <Route exact path='/reviews' component={ReviewsContainer} />
                            <Route exact path='/resume/:id' component={ResumeContainer} />
                        </Switch>
                    </div>
                </div>
                <FooterContainer />
            </div>
        </BrowserRouter>
    );
}

export default App;
 */
