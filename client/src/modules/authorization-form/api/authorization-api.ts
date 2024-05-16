import { createApi } from '@reduxjs/toolkit/query/react'
import { UserData } from '../types/User-data.ts'
import { baseQuery, jsonRequestHeaders } from '../../../api'
import { AuthResponse } from '../../../types/Auth-response.ts'

export const authorizationApi = createApi({
  reducerPath: 'authorizationApi',
  baseQuery: baseQuery(jsonRequestHeaders),
  endpoints: (build) => ({
    registration: build.mutation<AuthResponse, UserData>({
      query: (registrationData) => ({
        url: `users/registration`,
        method: 'POST',
        body: registrationData,
      }),
    }),
    authorization: build.mutation<AuthResponse, UserData>({
      query: (authorizationData) => ({
        url: `users/login`,
        method: 'POST',
        body: authorizationData,
      }),
    })
  })
})

export const {useRegistrationMutation, useAuthorizationMutation} = authorizationApi