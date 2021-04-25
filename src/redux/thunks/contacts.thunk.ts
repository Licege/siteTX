import { createAsyncThunk } from "@reduxjs/toolkit";
import { contactsAPI } from '../../api/api';

export const requestContacts = createAsyncThunk(
  'contacts/fetchAll',
  async () => {
      return await contactsAPI.getContacts();
  }
)