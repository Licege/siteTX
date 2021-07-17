import { createAsyncThunk } from "@reduxjs/toolkit"
import { complainAPI } from "../../api/api"

export const fetchComplains = createAsyncThunk(
  'complain/fetchComplains',
  async (params) => await complainAPI.getComplains(params)
)