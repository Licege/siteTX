import { createAsyncThunk } from "@reduxjs/toolkit";
import { contactsAPI } from '../../api/api';

export const requestContacts = createAsyncThunk(
  'contacts/fetchAll',
  async () => {
      const response = await contactsAPI.getContacts();
      console.log(response.data);
      return response.data
  }
)