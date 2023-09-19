// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

import MessageQueue, { useAlert } from './AlertSystem/MessageQueue'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(true)
        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: `Beareer ${storedToken}`
            }
          })
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data })
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('token')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params, errorCallback) => {
    axios
      .post(authConfig.loginEndpoint, params)
      .then(async response => {
        params.rememberMe ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.token) : null
        const returnUrl = router.query.returnUrl
        setUser({ ...response.data })
        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.username)) : null
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL)
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleRegister = (params, errorCallback) => {
    axios.post(authConfig.registerEndpoint, params).then(async response => {})
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const { addMessage, message, removeMessage } = useAlert()

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    addMessage: addMessage
  }

  return (
    <AuthContext.Provider value={values}>
      <MessageQueue message={message} removeMessage={removeMessage} />
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
