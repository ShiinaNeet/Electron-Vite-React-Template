import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import axios from 'axios'
// Custom APIs for renderer
const api = {
  axios: axios.create({
    baseURL: import.meta.env.VITE_API_URL_Auth_Test || 'https://fakestoreapi.com',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*'
    }
  }),

  setAuthorization(token) {
    this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', {
      setAuthToken: (token) => api.setAuthorization(token),
      request: async (url, options) => {
        try {
          const response = await api.axios.request({ url, ...options })
          console.log('Request response from preloadjs:', response)
          return response
        } catch (error) {
          console.error('Request error:', error)
          throw error.response?.data || { message: error.message }
        }
      }
    })
  } catch (error) {
    console.error('Preloadjs-Index: ', error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
