import React, {createContext} from 'react'
import io from 'socket.io-client'
import {useDispatch} from 'react-redux'
import {WS_BASE} from '../api/api'
import {wsUpdateOrderAC} from '../redux/reducers/delivery.reducer'

export const WebSocket = createContext(null)

export default ({children}) => {
  let socket
  let ws

  const dispatch = useDispatch()

  const send = ( data ) => {
    const payload = {
      data,
    }

    socket.emit('event://send-delivery', JSON.stringify(payload))
    console.log(payload)
    //dispatch()
  }

  if (!window.socket) {
    socket = io.connect(WS_BASE)
    window.socket = socket

    socket.on('event://get-delivery', ( data ) => {
      dispatch(wsUpdateOrderAC(JSON.parse(data)))
      //console.log(payload);
    })

    ws = {
      socket,
      send,
    }
  }

  return (
    <WebSocket.Provider value={ws}>
      {children}
    </WebSocket.Provider>
  )
}
