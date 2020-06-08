const axios = require('axios').default;

// Get API host from env variable, then get api baseurl
const host = process.env.REACT_APP_API_HOST
const baseUrl = host + '/api'

console.log(baseUrl)

var headers = {}

if (window.localStorage.getItem('operationally.token') !== null) {
  headers['Authorization'] = "Token " + window.localStorage.getItem('operationally.token')
}

const client = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  headers: headers
});

// Post credentials to server to log user in
export const authenticate = (username, password) => {
  client.post(
    '/auth_token/', {
      username: username,
      password: password
    }
  )
  .then((response) => {
    console.log(response)
  })
}

// Clear localStorage to log the user out and clear out their data.
// TODO: find a better way to do this. This clears all of localstorage. Redux?
export const logout = () => {
  window.localStorage.clear()
  window.location = "/"
}
