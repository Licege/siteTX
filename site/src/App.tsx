import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import history from './history';
// import MenuContainer from './containers/Menu/Menu'
// import BucketContainer from './containers/Bucket/Bucket'
import { requestContacts } from './redux/thunks/contacts.thunk'
import Alert from './components/core/Alert';
import { Error404 } from './pages/Errors/Error404'
import Promos from './pages/Promos/all/Promos'
import Promo from './pages/Promos/one/Promo'
import Contacts from './pages/Contacts/Contacts'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ButtonCallToUs from './components/Buttons/CallUs';
import Home from './pages/Home/Home'
import News from './pages/News/all/News'
import NewsById from './pages/News/one/NewsById'
import Banquets from './pages/Banquets'
import Order from './pages/Order/Order'
import Gallery from './components/Gallery/Gallery'
import Reviews from './pages/Reviews/Reviews'
import Vacancies from './pages/Vacancies/Vacancies'
import VacancyById from './pages/Vacancies/one'
import Resume from './pages/Vacancies/Resume/Resume'
import Profile from './pages/profile'
import { requestMe } from './redux/thunks/profile.thunks'
import { getMeSelector } from './redux/selectors/profile'
import { getAuthStatus } from './redux/selectors/auth'
import CatchErrors from './pages/Errors/CatchErrors'
import Complain from './pages/Complain'
import Modal from './components/Modals/ModalRoot'
import Menu from './pages/Menu'
import Bucket from './pages/Bucket'
import PDFViewer from './components/Modals/PDFViewer'
import { AppContent, AppWrapper } from './styles'
import { isProduction } from './utils'
import { gaPageView } from './utils/ga'
import 'react-toastify/dist/ReactToastify.css'

import './assets/main.scss'


history.listen(location => {
  gaPageView(location.pathname + location.search)
})

const App = () => {
  const dispatch = useDispatch()
  const me = useSelector(getMeSelector)
  const isAuthenticated = useSelector(getAuthStatus)

  const checkAuth = (component: JSX.Element | null) => () => (
    isAuthenticated ? component : <Redirect to='/' />
  )

  useEffect(() => {
    gaPageView(window.location.pathname + window.location.search)
  }, [])

  useEffect(() => {
    dispatch(requestContacts())
  }, [dispatch])

  useEffect(() => {
    if (isAuthenticated && (!me || !Object.keys(me).length)) {
      dispatch(requestMe())
    }
  }, [me, isAuthenticated, dispatch])

  return (
    <Router history={history}>
      <AppWrapper>
        <Header/>
        <AppContent>
          <CatchErrors>
            <Switch>
              {!isProduction() && <Route exact path="/me" render={checkAuth(<Profile/>)}/>}
              <Route exact path='/' component={Home}/>
              {!isProduction() && <Route path="/menu/:categoryId?" component={Menu}/>}
              <Route exact path='/contacts' component={Contacts}/>
              <Route exact path='/vacancies' component={Vacancies}/>
              <Route exact path='/vacancies/:id' component={VacancyById}/>
              {!isProduction() && <Route exact path="/gallery" component={Gallery}/>}
              {!isProduction() && <Route exact path="/order" component={Order}/>}
              <Route exact path='/news' component={News}/>
              <Route exact path='/news/:id' component={NewsById}/>
              {!isProduction() && <Route exact path="/bucket" component={Bucket}/>}
              {!isProduction() && <Route exact path="/reviews" component={Reviews}/>}
              {!isProduction() && <Route exact path="/resume/:id" component={Resume}/>}
              {!isProduction() && <Route exact path="/banquets" component={Banquets}/>}
              <Route exact path='/actions' component={Promos}/>
              <Route exact path='/actions/:id' component={Promo}/>
              <Route exact path='/complain' component={Complain} />
              {!isProduction() && <Route exact path="/test" component={PDFViewer}/>}
              <Route component={Error404}/>
            </Switch>
          </CatchErrors>
          <Footer/>
          <ButtonCallToUs />
        </AppContent>
        <Alert />
        <Modal />
        <ToastContainer />
      </AppWrapper>
    </Router>
  )
}

export default App
