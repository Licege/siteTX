import React, { createContext } from 'react'
import io from 'socket.io-client'
import { useDispatch } from 'react-redux'
import { WS_BASE } from '../api/api'
import * as actions from '../redux/reducers/bucket.reducer'
import { IDeliveryPost } from '../types/types'

export const WebSocketContext = createContext(null)
let socket: any

export default ({ children }: any) => {
  const dispatch = useDispatch()

  if (!socket) {
    socket = io.connect(WS_BASE)
  }

  const sendOrderDelivery = (order: IDeliveryPost) => {
    socket.emit('event://send-delivery', JSON.stringify(order))
  }

  socket.on('event://send-delivery:status', (data: string) => {

    switch (JSON.parse(data).status) {
    case 200:
    case 201:
      dispatch(actions.changeOrderStatus('created'))
      dispatch(actions.changeDeliveryPosted(true))
      dispatch(actions.clearBucket())
      break
    case 400:
    case 500:
      dispatch(actions.changeOrderStatus('error'))
      break
    default:
      dispatch(actions.changeOrderStatus('error'))
    }
  })

  const ws = {
    socket,
    sendOrderDelivery,
  }


  return (
  // @ts-ignore
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  )
}
