import { createSlice } from '@reduxjs/toolkit'
import { authorizationApi } from '../../modules/authorization-form'
import { userApi } from '../../api'
import { User } from '../../types/User.ts'

interface UserSliceState {
  user: User | null | 'unknown'
}

const initialState: UserSliceState = {
  user: 'unknown'
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(authorizationApi.endpoints.registration.matchFulfilled, (state, action) => {
      localStorage.setItem('accessToken', action.payload.accessToken)
      state.user = action.payload.user
    })
    builder.addMatcher(authorizationApi.endpoints.authorization.matchFulfilled, (state, action) => {
      localStorage.setItem('accessToken', action.payload.accessToken)
      state.user = action.payload.user
    })
    builder.addMatcher(userApi.endpoints.refreshToken.matchFulfilled, (state, action) => {
      localStorage.setItem('accessToken', action.payload.accessToken)
      state.user = action.payload.user
    })
  },
})

export default userSlice.reducer
