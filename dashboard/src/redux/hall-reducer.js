import { banquetHallsAPI } from '../api/api'
import { checkStatus } from '../plugins/checkStatus'

const GET_HALLS = 'BANQUET_HALL/GET_HALLS'
const GET_HALL = 'BANQUET_HALL/GET_HALL'
const CREATE_HALL = 'BANQUET_HALL/CREATE_HALL'
const UPDATE_HALL = 'BANQUET_HALL/UPDATE_HALL'
const DELETE_HALL = 'BANQUET_HALL/DELETE_HALL'

let initialState = {
    halls: [],
    currentHall: {},
}

const hallReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case GET_HALLS:
            return { ...state, halls: action.halls }
        case GET_HALL:
            return { ...state, currentHall: action.hall }
        case CREATE_HALL:
            return { ...state, halls: [ ...state.halls, action.hall ] }
        case UPDATE_HALL:
            return { ...state, halls: state.halls.map(hall => (hall.id === action.hall.id ? action.hall : hall)) }
        case DELETE_HALL:
            return { ...state, halls: state.halls.filter(hall => hall.id !== action.id) }
        default:
            return state
    }
}


const getHallsAC = ( halls ) => ({ type: GET_HALLS, halls })
const getHallAC = ( hall ) => ({ type: GET_HALL, hall })
const createHallAC = ( hall ) => ({ type: CREATE_HALL, hall })
const updateHallAC = ( hall ) => ({ type: UPDATE_HALL, hall })
const deleteHallAC = ( id ) => ({ type: DELETE_HALL, id })


export const getHalls = () => async ( dispatch ) => {
    let response = await banquetHallsAPI.getHalls()
    if (checkStatus(response.status)) {
        dispatch(getHallsAC(response.data))
    }
}

export const getHall = ( id ) => async ( dispatch ) => {
    let response = await banquetHallsAPI.getHall(id)
    if (checkStatus(response.status)) {
        dispatch(getHallAC(response.data))
    }
}

export const createHall = ( hall ) => async ( dispatch ) => {
    let response = await banquetHallsAPI.createHall(hall)
    if (checkStatus(response.status)) {
        dispatch(createHallAC(response.data))
    }
}

export const updateHall = ( hall ) => async ( dispatch ) => {
    let response = await banquetHallsAPI.updateHall(hall)
    if (checkStatus(response.status)) {
        dispatch(updateHallAC(response.data))
    }
}

export const deleteHall = ( id ) => async ( dispatch ) => {
    let response = await banquetHallsAPI.deleteHall(id)
    if (checkStatus(response.status)) {
        dispatch(deleteHallAC(id))
    }
}

export default hallReducer
