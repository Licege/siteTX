import {createAsyncThunk} from '@reduxjs/toolkit'
import {contactsAPI} from '../../api/api'

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAllContacts',
  async () => {
    return await contactsAPI.getContacts()
  }
)

export const updateContacts = createAsyncThunk(
  'contacts/putContact',
  async (contacts) => {
    return await contactsAPI.updateContacts(contacts)
  }
)