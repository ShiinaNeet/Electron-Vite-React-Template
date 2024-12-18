/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { useAuth } from '@renderer/auth/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import './Login.css'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = React.useState(false)
  const [account, setAccount] = React.useState({
    username: '',
    password: ''
  })
  const userType = {
    admin: 'ADMIN',
    dean: 'DEAN'
  }
  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const responseData = await login(account.username, account.password)
      console.log('Response Data:', responseData)
      if (responseData == userType.admin) {
        navigate('/home')
      } else {
        console.warn('User type not recognized')
      }
    } catch (error) {
      console.error('There was an error logging in!', error)
    } finally {
      setIsLoading(false)
    }
  }
  // useEffect(() => {
  //   const loginContainer = document.querySelector(".login");
  //   loginContainer.classList.add("slideIn");
  // }, []);
  return (
    <div className=" flex flex-col items-center justify-center h-screen bg-blue-750 ">
      <div className="flex flex-col gap-y-2 w-full max-w-lg px-3">
        <p className="slide-in-down-visible">Login</p>
        <TextField
          className="slide-in-visible"
          fullWidth
          label="Username"
          id="outlined-basic"
          variant="outlined"
          placeholder="Ex. JohnDoe"
          value={account.username}
          onChange={(e) => setAccount({ ...account, username: e.target.value })}
        />
        <TextField
          className="slide-in-visible"
          fullWidth
          label="Password"
          type="password"
          id="outlined-basic"
          variant="outlined"
          placeholder="Pasword here..."
          value={account.password}
          onChange={(e) => setAccount({ ...account, password: e.target.value })}
        />
        <Button
          className="bg-red-500 p-2 slide-in-visible"
          onClick={() => handleLogin()}
          disabled={isLoading}
        >
          Login
        </Button>
      </div>
    </div>
  )
}

export default Login
