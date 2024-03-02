import { createSlice } from '@reduxjs/toolkit'
import { authorizationApi } from '../../modules/authorization-form'

const initialState = {
  isAuthorized: false,
}
export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(authorizationApi.endpoints.registration.matchFulfilled, (state, action) => {
      localStorage.setItem('accessToken', action.payload)
      state.isAuthorized = true
    })
    builder.addMatcher(authorizationApi.endpoints?.authorization.matchFulfilled, (state, action) => {
      localStorage.setItem('accessToken', action.payload)
      state.isAuthorized = true
    })
  },
})

export default userSlice.reducer
