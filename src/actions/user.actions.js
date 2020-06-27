import history from '../history.js';

const axios = require('axios').default;

// Get API host from env variable, then get api baseurl
const host = process.env.REACT_APP_API_HOST
const baseUrl = host + '/api'

// Create axios client with baseUrl and auth headers above
const config = {
  baseURL: baseUrl,
  timeout: 1000,
};

const getToken = () => {
  return window.localStorage.getItem('operationally-token')
}

const getAuthConfig = () => {
  return {
    headers: {'Authorization': 'Token ' + getToken() },
    ...config
  }
}

export const SAVE_USER_REQUEST = 'SAVE_USER_REQUEST'
export function saveUserRequest(user) {
  return {
    type: SAVE_USER_REQUEST,
    user: user
  }
}

export const SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS'
export function saveUserSuccess(user) {
  return {
    type: SAVE_USER_SUCCESS,
    user: user
  }
}

export const SAVE_USER_FAIL = 'SAVE_USER_FAIL'
export function saveUserFail(error) {
  console.log(error)
  return {
    type: SAVE_USER_FAIL,
    message: "An error occurred."
  }
}

export function saveUser(user) {

  return function(dispatch) {
    dispatch(saveUserRequest())

    const client = axios.create(getAuthConfig())

    return client.patch(
      '/users/' + user.id + '/', user
    )
    .then( response => dispatch(saveUserSuccess(response.data)) )
    .catch( error => dispatch(saveUserFail(error)) )
  }
}
