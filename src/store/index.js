// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

// ** Reducers
import chat from 'src/store/apps/chat'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
import { GetAPI_summary_port, GetAPI_template_port, GetAPI_users_port } from 'src/store/api'

// import { GetAPI_users_port } from 'src/store/apps/users'

export const store = configureStore({
  reducer: {
    chat,
    email,
    invoice,
    calendar,
    permissions,
    GetAPI_summary_port,
    [GetAPI_summary_port.reducerPath]: GetAPI_summary_port.reducer,
    [GetAPI_users_port.reducerPath]: GetAPI_users_port.reducer,
    [GetAPI_template_port.reducerPath]: GetAPI_template_port.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
      .concat(GetAPI_summary_port.middleware)
      .concat(GetAPI_users_port.middleware)
      .concat(GetAPI_template_port.middleware)
})

setupListeners(store.dispatch)
