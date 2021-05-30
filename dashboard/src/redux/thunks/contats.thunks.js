import { createAsyncThunk } from '@reduxjs/toolkit'
import { contactsAPI } from '../../api/api'

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAllContacts',
  async () => {
    const response = await contactsAPI.getContacts()
    return response
  }
)

export const updateContacts = createAsyncThunk(
  'contacts/putContact',
  async (contacts) => {
    const response = await contactsAPI.updateContacts(contacts)
    return response
  }
)