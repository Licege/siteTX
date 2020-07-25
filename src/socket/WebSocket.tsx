import React, {createContext} from 'react'
import io from 'socket.io-client'
import {WS_BASE} from '../api/api'
import {useDispatch} from "react-redux";
import {changeDeliveryPostedAC, changeOrderStatusAC, clearBucketAC} from "../redux/bucket-reducer";

export const WebSocketContext = createContext(null)
let socket: any

export default ({children}: any) => {
    let ws
    const dispatch = useDispatch()

    if (!socket) {
        socket = io.connect(WS_BASE)
    }

    socket.on('event://send-delivery:status', (data: string) => {

        switch(JSON.parse(data).status) {
            case 200:
            case 201:
                dispatch(changeOrderStatusAC('created'))
                dispatch(changeDeliveryPostedAC(true))
                dispatch(clearBucketAC())
                break
            case 400:
            case 500:
                dispatch(changeOrderStatusAC('error'))
                break
            default:
                dispatch(changeOrderStatusAC('error'))
        }
    })

    ws = {
        socket
    }


    return (
        // @ts-ignore
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    )
}
