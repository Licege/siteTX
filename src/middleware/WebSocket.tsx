import React, {createContext} from 'react'
import io from 'socket.io-client'
import {WS_BASE} from '../api/api'

export const WebSocketContext = createContext('socket')

export default ({children}: any) => {
    let socket: any
    let ws

    const send = (data: any) => {
        const payload = {
            data
        }

        socket.emit('event://send-delivery', JSON.stringify(payload))
        console.log(payload);
    }

    if (!socket) {
        socket = io.connect(WS_BASE)

        // socket.emit('event://send-delivery', (data: any) => {
        //     //const payload = JSON.parse(data)
        //     //dispatch()
        //     //console.log(payload);
        // })

        ws = {
            socket,
            send
        }
    }


    return (
        // @ts-ignore
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    )
}
