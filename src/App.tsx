import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTransition, animated } from 'react-spring/web'
import {  Route, Switch, useLocation, withRouter } from 'react-router-dom'
import FooterContainer from './containers/Footer/Footer'
import HeaderContainer from './containers/Header/Header'
import MenuContainer from './containers/Menu/Menu'
import ContactsContainer from './containers/Contacts/Contacts'
import VacanciesContainer from './containers/Vacancies/Vacancies'
import GalleryContainer from './containers/Gallery/Gallery'
import OrderContainer from './containers/Order/Order'
import NewsContainer from './containers/News/News'
import NewsByIdContainer from './containers/News/NewsById'
import HomeContainer from './containers/Home/Home'
import BucketContainer from './containers/Bucket/Bucket'
import ReviewsContainer from './containers/Reviews/Reviews'
import ResumeContainer from './containers/Vacancies/Resume/Resume'
import { AppStateType } from './redux/redux-store'
import { refresh as refreshAction } from './redux/auth-reducer'
import { getContacts as getContactsAction } from './redux/contacts-reducer'
import { Error404 } from './components/Errors/Error404'
import BanquetsContainer from './containers/Banquets/BanquetsContainer'
import ActionsContainer from './containers/Actions/ActionsContainer'
import ActionContainer from './containers/Actions/ActionContainer'
import './assets/main.scss'

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
            opacity: 0,
            position: 'absolute',
            width: '100%',
            transform: `translate3d(100%, 0, 0)`,
        },
        enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        leave: {
            opacity: 0,
            transform: `translate3d(-50%, 0, 0)`,
        },
    })

    return (
        <div className='app-wrapper'>
            {transitions.map(( { item, props: transition, key } ) => (
                <animated.div key={key} style={transition}>
                    <HeaderContainer/>
                    <div className='app-wrapper-content'>
                        <Switch location={item}>
                            <Route exact path='/' component={HomeContainer}/>
                            <Route path='/menu/:id?' component={MenuContainer}/>
                            <Route exact path='/contacts' component={ContactsContainer}/>
                            <Route exact path='/vacancies' component={VacanciesContainer}/>
                            <Route exact path='/gallery' component={GalleryContainer}/>
                            <Route exact path='/order' component={OrderContainer}/>
                            <Route exact path='/news' component={NewsContainer}/>
                            <Route exact path='/news/:id' component={NewsByIdContainer}/>
                            <Route exact path='/bucket' component={BucketContainer}/>
                            <Route exact path='/reviews' component={ReviewsContainer}/>
                            <Route exact path='/resume/:id' component={ResumeContainer}/>
                            <Route exact path='/banquets' component={BanquetsContainer}/>
                            <Route exact path='/actions' component={ActionsContainer}/>
                            <Route exact path='/actions/:id' component={ActionContainer}/>
                            <Route component={Error404}/>
                        </Switch>
                    </div>
                    <FooterContainer/>
                </animated.div>
            ))}
        </div>
    )
}

export default App
