import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { registrationApi } from '../modules/registration-form'
import userReducer from './reducers/userSlice.ts'

const rootReducer = combineReducers({
  [registrationApi.reducerPath]: registrationApi.reducer,
  userReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(registrationApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
