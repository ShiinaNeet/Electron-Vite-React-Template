import './assets/index.css'
import './assets/main.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from './Layout.jsx'
import HomePage from './routes/Home.jsx'
import ProductsPage from './routes/Products/index.jsx'
import AccountPage from './routes/Account/Index.jsx'
import Login from './routes/Authentication/Login.jsx'
import Unauthorized from './routes/Unauthorized.jsx'
import ProtectedRoute from './auth/ProtectedRoute.jsx'
import { AuthProvider } from './auth/AuthProvider.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute element={<Layout />} />,
    children: [
      {
        path: '/home',
        element: <ProtectedRoute element={<HomePage />} />
      },
      {
        path: '/products',
        element: <ProtectedRoute element={<ProductsPage />} />
      },
      {
        path: '/account',
        element: <ProtectedRoute element={<AccountPage />} />
      }
    ]
  },
  {
    path: '/login',
    element: <ProtectedRoute element={<Login />} />
  },
  {
    path: '*',
    element: <Unauthorized />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <ErrorBoundary> */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    {/* </ErrorBoundary> */}
  </React.StrictMode>
)
