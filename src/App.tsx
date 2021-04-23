import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import MenuContainer from './containers/Menu/Menu'
import BucketContainer from './containers/Bucket/Bucket'
import { requestContacts } from './redux/thunks/contacts.thunk'
import { Error404 } from './pages/Errors/Error404'
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
// import Vacancies from './components/Vacancies/Vacancies'
// import Resume from './components/Vacancies/Resume/Resume'
import Profile from './pages/profile';
import { requestMe } from './redux/thunks/profile.thunks';
import { getMeSelector } from './redux/selectors/profile';
import { getAuthStatus } from './redux/selectors/auth';
import CatchErrors from './pages/Errors/CatchErrors';
// import Complain from './pages/complain/Complain';

const App = () => {
    const dispatch = useDispatch()
    const me = useSelector(getMeSelector)
    const isAuthenticated = useSelector(getAuthStatus)

    const checkAuth = (component: JSX.Element | null) => () => (
        isAuthenticated ? component : <Redirect to='/' />
    )

    useEffect(() => {
        dispatch(requestContacts())
    }, [])

    useEffect(() => {
        if (isAuthenticated && (!me || !Object.keys(me).length)) {
            dispatch(requestMe())
        }
    }, [me, isAuthenticated])

    return (
        <div className='app-wrapper'>
            <Header/>
            <div className='app-wrapper-content'>
                <CatchErrors>
                    <Switch>
                        <Route exact path='/me' render={checkAuth(<Profile />)} />
                        <Route exact path='/' component={Home}/>
                        <Route path='/menu/:id?' component={MenuContainer}/>
                        <Route exact path='/contacts' component={Contacts}/>
                        {/*<Route exact path='/vacancies' component={Vacancies}/>*/}
                        <Route exact path='/gallery' component={Gallery}/>
                        <Route exact path='/order' component={Order}/>
                        <Route exact path='/news' component={News}/>
                        <Route exact path='/news/:id' component={NewsById}/>
                        <Route exact path='/bucket' component={BucketContainer}/>
                        <Route exact path='/reviews' component={Reviews}/>
                        {/*<Route exact path='/resume/:id' component={Resume}/>*/}
                        <Route exact path='/banquets' component={Banquets}/>
                        <Route exact path='/actions' component={Promos}/>
                        <Route exact path='/actions/:id' component={Promo}/>
                        {/*<Route exact path='/complain' component={Complain} />*/}
                        <Route component={Error404}/>
                    </Switch>
                </CatchErrors>
                <Footer/>
            </div>
        </div>
    )
}

export default App
