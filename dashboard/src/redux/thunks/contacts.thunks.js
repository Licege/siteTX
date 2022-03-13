import {createAsyncThunk} from '@reduxjs/toolkit'
import {contactsAPI} from '../../api/api'

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAllContacts',
  async (_, {rejectWithValue}) => {
    try {
      return await contactsAPI.getContacts()
    } catch (e) {
      return rejectWithValue({status: e.status})
    }
  }
)

export const updateContacts = createAsyncThunk(
  'contacts/putContact',
  async (contacts, {rejectWithValue}) => {
    try {
      return await contactsAPI.updateContacts(contacts)
    } catch (e) {
      return rejectWithValue({status: e.status})
    }
  }
)