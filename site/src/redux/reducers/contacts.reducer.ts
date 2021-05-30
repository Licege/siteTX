import { createSlice } from "@reduxjs/toolkit";
import { contactsType } from '../../types/types'
import { requestContacts } from "../thunks/contacts.thunk";

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: {} as contactsType
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(requestContacts.fulfilled, (state, action) => { state.contacts = action.payload })
    }
})

export default contactsSlice.reducer
