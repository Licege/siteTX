import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import history from './history';
import { requestContacts } from './redux/thunks/contacts.thunk'
import Alert from './components/core/Alert';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ButtonCallToUs from './components/Buttons/CallUs';
import { requestMe } from './redux/thunks/profile.thunks'
import { getMeSelector } from './redux/selectors/profile'
import { getAuthStatus } from './redux/selectors/auth'
import CatchErrors from './pages/Errors/CatchErrors'
import Modal from './components/Modals/ModalRoot'
import { AppContent, AppWrapper } from './styles'
import { gaPageView, isMobile } from './utils'
import Routes from './routes';

import 'react-toastify/dist/ReactToastify.css'
import './assets/main.scss'


history.listen(location => {
  gaPageView(location.pathname + location.search)
})

const App = () => {
  const dispatch = useDispatch()
  const me = useSelector(getMeSelector)
  const isAuthenticated = useSelector(getAuthStatus)

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
            <Routes />
            {isMobile.any() && <ButtonCallToUs/>}
          </CatchErrors>
          <Footer/>
        </AppContent>
        <Alert />
        <Modal />
        <ToastContainer />
      </AppWrapper>
    </Router>
  )
}

export default App
