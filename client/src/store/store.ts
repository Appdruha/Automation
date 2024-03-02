import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authorizationApi } from '../modules/authorization-form'
import userReducer from './reducers/userSlice.ts'

const rootReducer = combineReducers({
  [authorizationApi.reducerPath]: authorizationApi.reducer,
  userReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authorizationApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
