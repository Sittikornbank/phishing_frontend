// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const GetAPI_summary_port = createApi({
  reducerPath: 'GetAPI_summary_port',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_USER_PORT}/`,
    prepareHeaders: (headers, { getState }) => {
      const token = window.localStorage.getItem('token')
      if (token) headers.set('Authorization', `Bearer ${token}`)

      return headers
    }
  }),
  endpoints: builder => ({
    getCampaigns_summary: builder.query({
      query: () => 'campaigns/summary'
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCampaigns_summaryQuery } = GetAPI_summary_port
