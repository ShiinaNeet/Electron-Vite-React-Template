import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthProvider'

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, userType } = useAuth()
  const location = useLocation()

  const redirectUserToTheirLayouts = () => {
    if (userType?.toLowerCase() === 'admin') {
      return <Navigate to="/home" replace />
    }
    return <Navigate to="/home" replace />
  }
  // if (isAuthenticated && localStorage.getItem('accessToken') != null) {
  //   return element
  // }
  // if (isAuthenticated == false && location.pathname.toLowerCase() !== '/login') {
  //   return <Navigate to="/login" state={{ from: location }} replace />
  // }
  if (isAuthenticated == true && location.pathname.toLowerCase() === '/login') {
    return redirectUserToTheirLayouts()
  }

  if (location.pathname.toLowerCase() === '/' && isAuthenticated) {
    return redirectUserToTheirLayouts()
  }

  return element
}

export default ProtectedRoute
