import React from 'react'
import WebSocket, { WebSocketContext } from './WebSocket'

// export function withWS<P extends any>(Component: React.ComponentType<any>) {
//     return function ThemedComponent(props: Pick<P, Exclude<keyof P, keyof any>>) {
//         return (
//             <WebSocketContext.Consumer>
//                 { (value) => <Component {...props} socket={value} />}
//             </WebSocketContext.Consumer>
//         )
//     }
// }

export function withWS<P extends any>(Component: React.ComponentType<any>) {
    return function WSComponent(props: any) {
        return (
            <WebSocketContext.Consumer>
                { (value) => <Component {...props} socket={value} />}
            </WebSocketContext.Consumer>
        )
    }
}
