const axios = require('axios').default;

// Get API Token from localStorage
const getToken = () => {
    return window.localStorage.getItem('routineops-token')
}

// Get API host from env variable, then get api baseurl
const host = process.env.REACT_APP_API_HOST
const baseUrl = host + '/api'

// Create axios client with baseUrl and auth headers above
 const baseConfig = {
  baseURL: baseUrl,
  timeout: 20000,
};


// Returns config object w/ authorization headers incl.
export const getAuthConfig = () => {
  return {
    headers: {'Authorization': 'Token ' + getToken() },
    ...baseConfig
  }
}

// Returns auth client if token available; else base client
export const getClient = () => {
    const token = getToken()
    if (token) {
        return axios.create(getAuthConfig())
    } else {
        return axios.create(baseConfig)
    }
}

