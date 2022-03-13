import {averageChecksAPI} from '../../api/api'

const GET_AVERAGE_CHECKS = 'SETTINGS/AVERAGE_CHECK'

let initialState = {
  avgChecks: [],
}

const averageChecksReducer = ( state = initialState, action ) => {
  switch (action.type) {
  case GET_AVERAGE_CHECKS:
    return {...state, avgChecks: action.avgChecks}
  default:
    return state
  }
}

const getAvgChecksAC = ( avgChecks ) => ({type: GET_AVERAGE_CHECKS, avgChecks})

export const requestAvgChecks = ( filter ) => async ( dispatch ) => {
  let response = await averageChecksAPI.getAverageChecks(filter)
  dispatch(getAvgChecksAC(response.data))
}

export default averageChecksReducer
