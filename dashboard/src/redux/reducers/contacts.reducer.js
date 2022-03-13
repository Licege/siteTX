import {createSlice} from '@reduxjs/toolkit'
import {fetchContacts, updateContacts} from '../thunks/contacts.thunks'

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: {
      openHours: []
    }
  },
  reducers: {},
  extraReducers: {
    [fetchContacts.fulfilled]: (state, action) => {
      state.contacts = action.payload
    },
    [updateContacts.fulfilled]: (state, action) => {
      state.contacts = action.payload
    }
  }
})

export default contactsSlice.reducer
