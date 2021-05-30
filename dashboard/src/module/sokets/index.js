import {io} from 'socket.io-client'
import {WS_BASE} from '../../api/api'

let socket

export function useSocketIO() {
  if (!socket) {
    socket = io(WS_BASE)
  }
  return socket
}