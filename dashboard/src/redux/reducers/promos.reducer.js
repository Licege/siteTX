import {createSlice} from '@reduxjs/toolkit'
import {requestAllPromos, requestPromoById, postPromo, updatePromo, removePromo} from '../thunks/promos.thunks'

const promoSlice = createSlice({
  name: 'promos',
  initialState: {
    promos: [],
    currentPromo: null
  },
  reducers: {},
  extraReducers: {
    [requestAllPromos.fulfilled]: (state, action) => ({...state, promos: action.payload}),
    [requestPromoById.fulfilled]: (state, action) => ({...state, currentPromo: action.payload}),
    [postPromo.fulfilled]: (state, action) => { state.promos.push(action.payload) },
    [updatePromo.fulfilled]: (state, action) => {
      state.promos = state.promos.map(promo => promo.id === action.payload.id ? action.payload : promo)
    },
    [removePromo.fulfilled]: (state, action) => {
      state.promos = state.promos.filter(promo => promo.id !== action.payload.id)
    }
  }
})

export default promoSlice.reducer
