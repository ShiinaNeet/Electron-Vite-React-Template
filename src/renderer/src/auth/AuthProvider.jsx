/* eslint-disable prettier/prettier */
// import axios from 'axios'
import { createContext, useContext, useState, useEffect } from 'react'
import { setupAxiosInterceptors } from '@src/preload/axios'

const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState('')
  const login = async (username, password) => {
    try {
      const response = await window.api.request('/auth/login', {
        method: 'POST',
        data: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
      })
      if (response.data.status === 'success') {
        localStorage.setItem('accessToken', response.data.access_token)
        const authTokens = {
          accessToken: localStorage.getItem('accessToken')
        }
        setupAxiosInterceptors(authTokens)
        window.api.setAuthToken(response.data.access_token)
        setIsAuthenticated(true)
        setUserType(response.data.account_type)
        return response.data.account_type
      } else {
        console.log('Failed to login: ', response.message)
        return false
      }
    } catch (error) {
      console.error('There was an error logging in!', error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    setIsAuthenticated(false)
    setUserType('')
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      setIsAuthenticated(true)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, setUserType, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
