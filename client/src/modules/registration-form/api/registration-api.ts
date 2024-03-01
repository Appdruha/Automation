import { createApi } from '@reduxjs/toolkit/query/react'
import { RegistrationData } from '../types/Registration.ts'
import { baseQuery, jsonRequestHeaders } from '../../../api'

export const registrationApi = createApi({
  reducerPath: 'registrationApi',
  baseQuery: baseQuery(jsonRequestHeaders),
  endpoints: (build) => ({
    registration: build.mutation<String, RegistrationData>({
      query: (registrationData) => ({
        url: `users/registration`,
        method: 'POST',
        body: registrationData,
      }),
      transformResponse: (response: AuthResponse) => {
        return response.accessToken
      },
    })
  })
})

export const {useRegistrationMutation} = registrationApi