import { messagesAPI } from '../api/api'
import { checkStatus } from '../plugins/checkStatus'

const GET_MESSAGES = 'GET_MESSAGES'
const GET_MESSAGE = 'GET_MESSAGE'
const DELETE_MESSAGE = 'DELETE_MESSAGE'

let initialState = {
    messages: [],
    message: null,
}

const messageReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case GET_MESSAGE:
            return { ...state, message: action.message }
        case GET_MESSAGES:
            return { ...state, messages: action.messages }
        case DELETE_MESSAGE:
            return { ...state, messages: state.messages.filter(m => m.id !== action.id) }
        default:
            return state
    }
}

const getMessageAC = ( message ) => ({ type: GET_MESSAGE, message })
const getMessagesAC = ( messages ) => ({ type: GET_MESSAGES, messages })
const deleteMessageAC = ( id ) => ({ type: DELETE_MESSAGE, id })

export const requestMessages = ( messages ) => async ( dispatch ) => {
    let response = await messagesAPI.getMessages()
    if (checkStatus(response.status)) {
        dispatch(getMessagesAC(response.data))
    }
}

export const requestMessage = ( message ) => async ( dispatch ) => {
    let response = await messagesAPI.getMessages()
    if (checkStatus(response.status)) {
        dispatch(getMessageAC(response.data))
    }
}

export const deleteMessage = ( id ) => async ( dispatch ) => {
    let response = await messagesAPI.deleteMessage(id)
    if (checkStatus(response.status)) {
        dispatch(deleteMessageAC(id))
    }
}

export default messageReducer
