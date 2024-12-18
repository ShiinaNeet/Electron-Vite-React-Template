/* eslint-disable prettier/prettier */
import axios from 'axios'

window.axios = axios
// Change to the URL of your backend
// Get in Backend URI from the .env file
axios.defaults.baseURL = import.meta.env.VITE_API_URL_Auth_Test
window.axios.defaults.baseURL = import.meta.env.VITE_API_URL_Auth_Test
// window.axios.defaults.baseURL = 'https://fakestoreapi.com'
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

const setupAxiosInterceptors = (authTokens) => {
  window.axios.interceptors.request.use(
    async (config) => {
      // const expiryToken = localStorage.getItem('expiryToken');

      // if (expiryToken) {
      //     const tokenExpiry = parseInt(expiryToken, 10);

      //     if (Date.now() >= tokenExpiry) {
      //         try {
      //             const refreshToken = localStorage.getItem('refreshToken');
      //             const response = await axios.post('/refresh', { refreshToken });
      //             // Check if the response is successful with status code 200
      //             if (response.status === 200) {
      //                 const { accessToken, newRefreshToken } = response.data;
      //                 localStorage.setItem('accessToken', accessToken);
      //                 localStorage.setItem('refreshToken', newRefreshToken);

      //                 const datenow = new Date();
      //                 datenow.setMinutes(datenow.getMinutes() + 60);
      //                 const expiredDate = datenow.getTime();
      //                 localStorage.setItem('expiryToken', expiredDate.toString());

      //                 axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      //                 config.headers.Authorization = `Bearer ${accessToken}`;
      //             } else {
      //                 console.error('Error refreshing token', response);
      //                 return Promise.reject(new Error('Error refreshing token'));
      //             }
      //         } catch (error) {
      //             console.error('Error refreshing token', error);
      //             return Promise.reject(error);
      //         }
      //     } else if (authTokens?.accessToken) {
      //         config.headers.Authorization = `Bearer ${authTokens.accessToken}`;
      //     }
      // } else if (authTokens?.accessToken) {
      //     config.headers.Authorization = `Bearer ${authTokens.accessToken}`;
      // }
      const accessToken = localStorage.getItem('accessToken')
      config.headers.Authorization = `Bearer ${authTokens.accessToken}`
      axios.defaults.headers.common['Authorization'] = `Bearer ${authTokens.accessToken}`
      if (accessToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        config.headers.Authorization = `Bearer ${accessToken}`
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

export { setupAxiosInterceptors }