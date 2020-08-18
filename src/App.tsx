import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { animated, useTransition } from 'react-spring/web'
import { Route, Switch, useLocation } from 'react-router-dom'
import MenuContainer from './containers/Menu/Menu'
import BucketContainer from './containers/Bucket/Bucket'
import { AppStateType } from './redux/redux-store'
import { refresh as refreshAction } from './redux/auth-reducer'
import { getContacts as getContactsAction } from './redux/contacts-reducer'
import { Error404 } from './components/Errors/Error404'
import { Promos } from './components/Promos/Promos'
import { Promo } from './components/Promos/Promo'
import './assets/main.scss'
import Contacts from './components/Contacts/Contacts'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import News from './components/News/News'
import NewsById from './components/News/NewsById'
import { Banquets } from './components/Banquets/Banquets'
import Order from './components/Order/Order'
import Gallery from './components/Gallery/Gallery'
import Reviews from './components/Reviews/Reviews'
import Vacancies from './components/Vacancancies/Vacancies'
import Resume from './components/Vacancancies/Resume/Resume'

const App = () => {
    const dispatch = useDispatch()
    const contacts = useSelector((state: AppStateType) => state.contacts.contacts)
    const refresh: any = useCallback(() => dispatch(refreshAction()), [dispatch])
    const getContacts: any = useCallback(() => dispatch(getContactsAction()), [dispatch])

    if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) {
        refresh()
    }

    if (!Object.keys(contacts).length) getContacts()

    let location = useLocation()

    const transitions = useTransition(location, (location: any) => location.pathname, {
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
            {transitions.map(({ item, props: transition, key }) => (
                <animated.div key={key} style={transition}>
                    <div className='app-wrapper-content'>
                        <Switch location={item}>
                            <Route exact path='/' component={Home}/>
                            <Route path='/menu/:id?' component={MenuContainer}/>
                            <Route exact path='/contacts' component={Contacts}/>
                            <Route exact path='/vacancies' component={Vacancies}/>
                            <Route exact path='/gallery' component={Gallery}/>
                            <Route exact path='/order' component={Order}/>
                            <Route exact path='/news' component={News}/>
                            <Route exact path='/news/:id' component={NewsById}/>
                            <Route exact path='/bucket' component={BucketContainer}/>
                            <Route exact path='/reviews' component={Reviews}/>
                            <Route exact path='/resume/:id' component={Resume}/>
                            <Route exact path='/banquets' component={Banquets}/>
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
