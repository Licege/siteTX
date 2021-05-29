import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { usersAPI } from '../api/api'

export const requestUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async ({ page = 1, filters } = {}) => {
      console.log(page)
      console.log(filters)
      const response = await usersAPI.getUsers(page, filters)
      return response.data
  }
)

export const requestCurrentUser = createAsyncThunk(
  'users/fetchUserById',
  async (id) => {
      const response = await usersAPI.getUserById(id)
      return response.data
  }
)

export const updateCurrentUser = createAsyncThunk(
  'users/updateUserById',
  async (profile) => {
      const response = await usersAPI.updateUser(profile)
      return response.data
  }
)

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        currentUser: null,
        users: [],
        filters: {},
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }
    },
    extraReducers: {
        [requestUsers.pending]: state => {
            state.isFetching = true
        },
        [requestUsers.fulfilled]: (state, action) => {
            state.totalUsersCount = action.payload.total_count
            state.users = action.payload.users
            state.isFetching = false
        },
        [requestUsers.rejected]: state => {
            state.isFetching = false
        },
        [requestCurrentUser.fulfilled]: (state, action) => {
            state.currentUser = action.payload
        },
        [updateCurrentUser.fulfilled]: (state, action) => {
            state.currentUser = action.payload
        }
    }
})

export const { setCurrentPage } = usersSlice.actions

export default usersSlice.reducer
