import { createApi } from '@reduxjs/toolkit/query/react'
import { UserData } from '../types/User-data.ts'
import { baseQuery, jsonRequestHeaders } from '../../../api'

export const authorizationApi = createApi({
  reducerPath: 'authorizationApi',
  baseQuery: baseQuery(jsonRequestHeaders),
  endpoints: (build) => ({
    registration: build.mutation<string, UserData>({
      query: (registrationData) => ({
        url: `users/registration`,
        method: 'POST',
        body: registrationData,
      }),
      transformResponse: (response: AuthResponse) => {
        return response.accessToken
      },
    }),
    authorization: build.mutation<string, UserData>({
      query: (authorizationData) => ({
        url: `users/login`,
        method: 'POST',
        body: authorizationData,
      }),
      transformResponse: (response: AuthResponse) => {
        return response.accessToken
      },
    })
  })
})

export const {useRegistrationMutation, useAuthorizationMutation} = authorizationApi