import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@renderer/auth/AuthProvider'
const Unauthorized = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  useEffect(() => {
    if (!isAuthenticated || localStorage.getItem('accessToken') != null) {
      navigate('/login')
    }
  }, [])
  return (
    <div>
      <h1>Unauthorized</h1>
      <p>You do not have permission to view this page.</p>
      <button onClick={() => navigate('/home')}>Go to home</button>
    </div>
  )
}

export default Unauthorized
