import { createSlice } from '@reduxjs/toolkit'
import { registrationApi } from '../../modules/registration-form'

const initialState = {
  isAuthorized: false,
}
export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(registrationApi.endpoints.registration.matchFulfilled,
      (state, action) => {
      localStorage.setItem('accessToken', action.payload as string)
      state.isAuthorized = true
    })
  },
})

export default userSlice.reducer
