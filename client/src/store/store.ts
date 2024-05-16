import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authorizationApi } from '../modules/authorization-form'
import userReducer from './reducers/user-slice.ts'
import { userApi } from '../api'

const rootReducer = combineReducers({
  [authorizationApi.reducerPath]: authorizationApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  userReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([authorizationApi.middleware, userApi.middleware]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
