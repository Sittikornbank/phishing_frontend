// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const GetAPI_users_port = createApi({
  reducerPath: 'GetAPI_users',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_USERAUTH_PORT}/`,
    prepareHeaders: (headers, { getState }) => {
      const token = window.localStorage.getItem('token')
      if (token) headers.set('Authorization', `Bearer ${token}`)

      return headers
    }
  }),
  endpoints: builder => ({
    getUsersAPI: builder.query({
      query: () => 'users'
    })
  })
})

export const { useGetUsersAPIQuery } = GetAPI_users_port
