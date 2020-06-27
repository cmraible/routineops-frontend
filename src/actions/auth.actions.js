import history from '../history.js';
import { getOrg } from './organization.actions';


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

export const LOGOUT = 'LOGOUT'
export function logout() {
  window.localStorage.removeItem('operationally-token')
  history.push('/')
  return {
    type: LOGOUT
  }
}


export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export function loginRequest() {
  return {
    type: LOGIN_REQUEST
  }
}


export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export function loginSuccess(token, user) {
  history.push('/')
  // Save the token to localstorage
  window.localStorage.setItem('operationally-token', token)

  return {
      type: LOGIN_SUCCESS,
      token: token,
      user: user
  }
}

export const LOGIN_FAIL = 'LOGIN_FAIL'
export function loginFail(error) {
  if (error.response) {
    if (error.response.status === 400) {
      return {
        type: LOGIN_FAIL,
        message: 'Unable to login with provided credentials.'
      }
    } else {
      return {
        type: LOGIN_FAIL,
        message: 'Login failed for an unknown reason.'
      }
    }
  } else {
    return {
      type: LOGIN_FAIL,
      message: 'Unable to connect.'
    }
  }

}


export function login(username, password) {

  return function(dispatch) {
    dispatch(loginRequest())

    const client = axios.create(config)

    return client.post(
      '/auth_token/', {
        username: username,
        password: password
      }
    )
    .then( (response) => {
      dispatch(loginSuccess(response.data.token, response.data.user))
      dispatch(getOrg(response.data.user.organization))
    })
    .catch( (error) => {
      console.log(error.response)
      dispatch(loginFail(error))
    } )

  }
}


export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export function signupRequest(user) {
  return {
    type: SIGNUP_REQUEST,
    user: user
  }
}

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export function signupSuccess(user) {
  history.push('/signup/success')
  return {
    type: SIGNUP_SUCCESS,
    user: user
  }
}

export const SIGNUP_FAIL = 'SIGNUP_FAIL'
export function signupFail(error) {
  if (error.response) {
    if (error.response.status === 400) {
      return {
        type: SIGNUP_FAIL,
        errors: error.response.data
      }
    }
  } else {
    return {
      type: SIGNUP_FAIL,
      errors: {'form': 'Unable to connect'}
    }
  }
}

export function signup(user) {

  return function(dispatch) {
    dispatch(signupRequest())

    const client = axios.create(config)

    return client.post(
      '/register/', user
    )
    .then( response => {
      dispatch(signupSuccess(response.data))
    })
    .catch( error => dispatch(signupFail(error)) )
  }
}
