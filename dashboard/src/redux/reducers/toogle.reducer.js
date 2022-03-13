import {createSlice} from '@reduxjs/toolkit'

const toggleSlice = createSlice({
  name: 'toggle',
  initialState: {
    active: null
  },
  reducers: {
    toggle: (state, action) => {
      state.active = !state.active
    }
  }
})

export const {toggle} = toggleSlice.actions

export default toggleSlice.reducer

