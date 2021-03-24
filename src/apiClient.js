import { logout } from './features/auth/authSlice';

const axios = require('axios').default;



// Get API host from env variable, then get api baseurl
let host
if (window.Cypress) {
  host = window.Cypress.env('REACT_APP_API_HOST')
} else {
  host = process.env.REACT_APP_API_HOST
}
const baseUrl = host + '/api'


// Create axios client with baseUrl and auth headers above
 const baseConfig = {
  baseURL: baseUrl,
  timeout: 20000,
};

console.log(`Initializing API client with baseUrl: ${baseUrl}`)

const getClient = (dispatch, getState) => {
  const instance = axios.create(baseConfig)

  instance.interceptors.request.use((config) => {
    const token = getState().auth.token
    if (token) {
      config.headers.Authorization = `Token ${token}`
    }
    return config
  }, (error) => {
    return Promise.reject(error);
  });

  instance.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    if (error.response && error.response.status === 401) {
      console.log('logging out')
      dispatch(logout());
    }
    return Promise.reject(error);
  });
  return instance
}

export default getClient;