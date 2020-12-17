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


// Returns config object w/ authorization headers incl.
export const getAuthConfig = (token) => {
  return {
    headers: {'Authorization': 'Token ' + token },
    ...baseConfig
  }
}

// Returns auth client if token available; else base client
export const getClient = (token) => {
    if (token) {
        return axios.create(getAuthConfig(token))
    } else {
        return axios.create(baseConfig)
    }
}

