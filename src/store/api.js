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
    }),
    getCampaign: builder.query({
      query: id => `campaigns/${id}`
    }),
    getCampaign_result: builder.query({
      query: id => `campaigns/${id}/results`
    }),
    getCampaign_summary_result: builder.query({
      query: id => `campaigns/${id}/summary`
    }),
    getOverViews: builder.query({
      query: () => 'campaigns/results/all'
    })
  })
})

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
    }),
    getUsersByID: builder.query({
      query: id => `users/${id}`
    }),
    createUser: builder.mutation({
      query: body => ({
        url: `users`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Posts']
    }),
    updateUser: builder.mutation({
      query: (id, body) => ({
        url: `users/${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Put']
    })
  })
})

export const GetAPI_template_port = createApi({
  reducerPath: 'GetAPI_users',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_TEMPLATE_PORT}/`,
    prepareHeaders: (headers, { getState }) => {
      const token = window.localStorage.getItem('token')
      if (token) headers.set('Authorization', `Bearer ${token}`)

      return headers
    }
  }),
  endpoints: builder => ({})
})

export const {
  useGetCampaigns_summaryQuery,
  useGetOverViewsQuery,
  useGetCampaignQuery,
  useGetCampaign_summary_resultQuery,
  useGetCampaign_resultQuery
} = GetAPI_summary_port

export const { useGetUsersAPIQuery, useGetUsersByIDQuery } = GetAPI_users_port