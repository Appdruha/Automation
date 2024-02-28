import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

export const registrationApi = createApi({
  reducerPath: 'registrationApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_AUTOMATION_API_URL }),
  endpoints: (build) => ({
    registration: build.mutation<>({
      query: (post) => ({
        url: `/registration`,
        method: 'POST',
        body: post
      }),
    })
  })
})