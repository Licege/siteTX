import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/redux-store'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import WebSocketProvider from './socket/WebSocket'
import { ru } from 'date-fns/locale'

let rerenderEntireTree = () => {
    ReactDOM.render(
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
            <BrowserRouter>
                <Provider store={store}>
                        <WebSocketProvider>
                            <App/>
                        </WebSocketProvider>
                </Provider>
            </BrowserRouter>
        </MuiPickersUtilsProvider>, document.getElementById('root'))
}

rerenderEntireTree()

store.subscribe(() => {
    rerenderEntireTree()
})

serviceWorker.unregister()
