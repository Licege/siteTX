import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/redux-store'
import { PersistGate } from 'redux-persist/integration/react'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import WebSocketProvider from './socket/WebSocket'
import { ru } from 'date-fns/locale'

let rerenderEntireTree = () => {
    ReactDOM.render(
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
            <BrowserRouter>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <WebSocketProvider>
                            <App/>
                        </WebSocketProvider>
                    </PersistGate>
                </Provider>
            </BrowserRouter>
        </MuiPickersUtilsProvider>, document.getElementById('root'))
}

rerenderEntireTree()

store.subscribe(() => {
    rerenderEntireTree()
})

serviceWorker.unregister()
