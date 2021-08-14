import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ReactGA from 'react-ga';
import { Provider } from 'react-redux'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { ru } from 'date-fns/locale'
import { ThemeProvider } from 'styled-components';
import store from './redux/redux-store'
import * as serviceWorker from './serviceWorker'
import App from './App'
import { theme } from './styledComponents/theme'
import GlobalStyles from './styledComponents/globalStyles'

if (process.env.REACT_APP_GA_ENABLED && process.env.REACT_APP_GA_TRACK) {
  ReactGA.initialize(process.env.REACT_APP_GA_TRACK);
}

const rerenderEntireTree = () => {
  ReactDOM.render(
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <App/>
            <GlobalStyles />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </MuiPickersUtilsProvider>, document.getElementById('root'))
}

rerenderEntireTree()

store.subscribe(() => {
  rerenderEntireTree()
})

serviceWorker.unregister()
