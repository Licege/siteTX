import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { animated, useTransition } from 'react-spring/web'
import { Route, Switch, useLocation } from 'react-router-dom'
import MenuContainer from './containers/Menu/Menu'
import VacanciesContainer from './containers/Vacancies/Vacancies'
import GalleryContainer from './containers/Gallery/Gallery'
import OrderContainer from './containers/Order/Order'
import NewsContainer from './containers/News/News'
import NewsByIdContainer from './containers/News/NewsById'
import BucketContainer from './containers/Bucket/Bucket'
import ReviewsContainer from './containers/Reviews/Reviews'
import ResumeContainer from './containers/Vacancies/Resume/Resume'
import { AppStateType } from './redux/redux-store'
import { refresh as refreshAction } from './redux/auth-reducer'
import { getContacts as getContactsAction } from './redux/contacts-reducer'
import { Error404 } from './components/Errors/Error404'
import BanquetsContainer from './containers/Banquets/BanquetsContainer'
import { Promos } from './components/Promos/Promos'
import { Promo } from './components/Promos/Promo'
import './assets/main.scss'
import Contacts from './components/Contacts/Contacts'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'

const App = () => {
    const dispatch = useDispatch()
    const contacts = useSelector(( state: AppStateType ) => state.contacts.contacts)
    const refresh: any = useCallback(() => dispatch(refreshAction()), [ dispatch ])
    const getContacts: any = useCallback(() => dispatch(getContactsAction()), [ dispatch ])

    if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) {
        refresh()
    }

    if (!Object.keys(contacts).length) getContacts()

    let location = useLocation()

    const transitions = useTransition(location, ( location: any ) => location.pathname, {
        from: {
            opacity: 0.4,
            position: 'absolute',
            width: '100%',
        },
        enter: { opacity: 1 },
        leave: {
            opacity: 0,
        },
    })

    return (
        <div className='app-wrapper'>
            <Header/>
            {transitions.map(( { item, props: transition, key } ) => (
                <animated.div key={key} style={transition}>
                <div className='app-wrapper-content'>
                        <Switch location={item}>
                            <Route exact path='/' component={Home}/>
                            <Route path='/menu/:id?' component={MenuContainer}/>
                            <Route exact path='/contacts' component={Contacts}/>
                            <Route exact path='/vacancies' component={VacanciesContainer}/>
                            <Route exact path='/gallery' component={GalleryContainer}/>
                            <Route exact path='/order' component={OrderContainer}/>
                            <Route exact path='/news' component={NewsContainer}/>
                            <Route exact path='/news/:id' component={NewsByIdContainer}/>
                            <Route exact path='/bucket' component={BucketContainer}/>
                            <Route exact path='/reviews' component={ReviewsContainer}/>
                            <Route exact path='/resume/:id' component={ResumeContainer}/>
                            <Route exact path='/banquets' component={BanquetsContainer}/>
                            <Route exact path='/actions' component={Promos}/>
                            <Route exact path='/actions/:id' component={Promo}/>
                            <Route component={Error404}/>
                        </Switch>
                    <Footer/>
                </div>
                </animated.div>
            ))}
        </div>
    )
}

export default App
