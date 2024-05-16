import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-query-instance.ts'
import { jsonRequestHeaders } from './request-headers.ts'
import { AuthResponse } from '../types/Auth-response.ts'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQuery(jsonRequestHeaders),
  endpoints: (build) => ({
    refreshToken: build.mutation<AuthResponse, void>({
      query: () => ({
        url: 'users/refresh',
        method: 'POST',
      }),
    }),
  }),
})

export const { useRefreshTokenMutation } = userApi
