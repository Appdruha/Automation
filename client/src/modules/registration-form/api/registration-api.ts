import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { RegistrationData } from '../types/Registration.ts'

export const registrationApi = createApi({
  reducerPath: 'registrationApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_AUTOMATION_API_URL }),
  endpoints: (build) => ({
    registration: build.mutation<AuthResponse, RegistrationData>({
      query: (userData) => ({
        url: `/registration`,
        method: 'POST',
        body: userData
      }),
    })
  })
})