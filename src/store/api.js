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
  keepUnusedDataFor: 30,
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
    }),
    getGroup: builder.query({
      query: () => `groups`
    }),
    getCampaignGraph: builder.query({
      query: () => `campaigns/graphs?sampling=86400`
    }),

    createCampaign: builder.mutation({
      query: body => ({
        url: 'campaigns',
        method: 'POST',
        body
      }),
      providesTags: ['CreateCampaigns']
    }),

    deleteCampaign: builder.mutation({
      query: id => ({
        url: `campaigns/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['DeleteCampaign']
    }),

    luachCampaine: builder.mutation({
      query: id => ({
        url: `campaigns/${id}/launch`,
        method: 'POST'
      }),
      invalidatesTags: ['LuachCampaign']
    }),

    createGroup: builder.mutation({
      query: body => ({
        url: `groups`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['CreateGroup']
    }),

    deleteGroup: builder.mutation({
      query: id => ({
        url: `groups/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['DeleteGroup']
    }),

    updateGroup: builder.mutation({
      query: body => ({
        url: `groups/${body.id}`,
        method: 'PUT',
        body
      })
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
    register: builder.query({
      query: body => ({
        url: 'register',
        method: 'POST',
        body
      }),
      providesTags: ['Register'],
      transformResponse: response => response
    }),
    getAccountAPI: builder.query({
      query: () => 'me'
    }),
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
      query: body => ({
        url: `users/${body.id}`,
        method: 'PUT',
        body: body
      })
    }),
    deleteUser: builder.mutation({
      query: id => ({
        url: `users/${id}`,
        method: 'Delete'
      }),
      invalidatesTags: ['DeleteUser']
    })
  })
})

export const GetAPI_template_port = createApi({
  reducerPath: 'GetAPI_template',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_TEMPLATE_PORT}/`,
    prepareHeaders: (headers, { getState }) => {
      const token = window.localStorage.getItem('token')
      if (token) headers.set('Authorization', `Bearer ${token}`)

      return headers
    }
  }),
  endpoints: builder => ({
    getTemplate: builder.query({
      query: () => `templates`
    }),

    createTemplate: builder.mutation({
      query: body => ({
        url: `templates`,
        method: 'POST',
        body
      })
    }),

    getEmailTemplates: builder.query({
      query: () => `email_templates`
    }),

    createEmailTemplate: builder.mutation({
      query: body => ({
        url: `email_templates`,
        method: 'POST',
        body
      })
    }),

    updateEmailTemplate: builder.mutation({
      query: body => ({
        url: `email_templates/${body.id}`,
        method: 'PUT',
        body
      })
    }),

    deleteEmailTemplate: builder.mutation({
      query: id => ({
        url: `email_templates/${id}`,
        method: 'DELETE'
      })
    }),

    getLandingPage: builder.query({
      query: () => `site_templates`
    }),

    updateLandingPage: builder.mutation({
      query: body => ({
        url: `site_templates/${body.id}`,
        method: 'PUT',
        body
      })
    }),

    deleteLandingPage: builder.mutation({
      query: id => ({
        url: `site_templates/${id}`,
        method: 'DELETE'
      })
    }),
    createLandingPage: builder.mutation({
      query: body => ({
        url: `site_templates`,
        method: 'POST',
        body
      })
    })
  })
})

export const GetAPI_mail_port = createApi({
  reducerPath: 'GetAPI_mails',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_MAIL_PORT}/`,
    prepareHeaders: (headers, { getState }) => {
      const token = window.localStorage.getItem('token')
      if (token) headers.set('Authorization', `Bearer ${token}`)

      return headers
    }
  }),
  endpoints: builder => ({
    getSmtpData: builder.query({
      query: () => `smtp`
    }),

    createSmtpData: builder.mutation({
      query: body => ({
        url: `smtp`,
        method: 'POST',
        body
      })
    }),

    updateSmtpData: builder.mutation({
      query: body => ({
        url: `smtp/${body.id}`,
        method: 'PUT',
        body
      })
    }),

    deleteSmtpData: builder.mutation({
      query: id => ({
        url: `smtp/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useGetCampaigns_summaryQuery,
  useGetOverViewsQuery,
  useGetCampaignQuery,
  useGetCampaign_summary_resultQuery,
  useGetCampaign_resultQuery,
  useGetGroupQuery,
  useGetCampaignGraphQuery,
  useCreateCampaignMutation,
  useDeleteCampaignMutation,
  useLuachCampaineMutation,
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useUpdateGroupMutation
} = GetAPI_summary_port

export const {
  useGetUsersAPIQuery,
  useGetUsersByIDQuery,
  useGetAccountAPIQuery,
  useRegisterQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = GetAPI_users_port

export const {
  useGetTemplateQuery,
  useCreateTemplateMutation,
  useGetEmailTemplatesQuery,
  useUpdateEmailTemplateMutation,
  useDeleteEmailTemplateMutation,
  useGetLandingPageQuery,
  useCreateEmailTemplateMutation,
  useDeleteLandingPageMutation,
  useCreateLandingPageMutation,
  useUpdateLandingPageMutation
} = GetAPI_template_port

export const { useGetSmtpDataQuery, useDeleteSmtpDataMutation, useCreateSmtpDataMutation, useUpdateSmtpDataMutation } =
  GetAPI_mail_port
