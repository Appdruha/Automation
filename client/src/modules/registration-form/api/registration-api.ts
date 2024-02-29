import { createApi } from '@reduxjs/toolkit/query/react'
import { RegistrationData } from '../types/Registration.ts'
import { baseQuery, jsonRequestHeaders } from '../../../api'

export const registrationApi = createApi({
  reducerPath: 'registrationApi',
  baseQuery: baseQuery(jsonRequestHeaders),
  endpoints: (build) => ({
    registration: build.mutation<AuthResponse, RegistrationData>({
      query: (registrationData) => ({
        url: `users/registration`,
        method: 'POST',
        body: registrationData
      }),
    })
  })
})

export const {useRegistrationMutation} = registrationApi