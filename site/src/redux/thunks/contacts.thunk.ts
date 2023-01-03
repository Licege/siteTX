import { createAsyncThunk } from '@reduxjs/toolkit';
import { contactsAPI } from '@/api';

export const requestContacts = createAsyncThunk(
  'contacts/fetchAll',
  async () => contactsAPI.getContacts()
)