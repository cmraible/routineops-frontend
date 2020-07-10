import history from '../history.js';
import { getOrg } from './organization.actions';
import { getClient } from '../apiClient';

export const LOGOUT = 'LOGOUT'
export const logout = () => {
  window.localStorage.removeItem('operationally-token')
  history.push('/')
  return {
    type: LOGOUT
  }
} 

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const loginRequest = () => ({
  type: LOGIN_REQUEST
});

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const loginSuccess = (token, user) => {
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
export const loginFail = (message) => {
  return {
    type: LOGIN_FAIL,
    message: message
  }
}

export const login = (username, password) => ((dispatch) => {
  dispatch(loginRequest())

  const client = getClient()

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
    if (!error.response) {
      // No response from server
      dispatch(loginFail('Unable to connect to server.'))
    } else if (error.response.status === 400) {
      dispatch(loginFail('Unable to login with the provided credentials.'))
    } else {
      dispatch(loginFail('Something went wrong.'))
    }
  })
});

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const signupRequest = (user) => ({
  type: SIGNUP_REQUEST,
  user: user
});

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const signupSuccess = (user) => {
  return {
    type: SIGNUP_SUCCESS,
    user: user
  }
}

export const SIGNUP_FAIL = 'SIGNUP_FAIL'
export const signupFail = (message) => {
  return {
    type: SIGNUP_FAIL,
    message: message
  }
}

export const signup = (user) => ((dispatch) => {
  dispatch(signupRequest())

  const client = getClient()

  return client.post(
    '/register/', user
  )
  .then( response => {
    dispatch(signupSuccess(response.data))
    dispatch(login(user.email, user.password))
  })
  .catch( error => {
    if (!error.response) {
      return dispatch(signupFail('Unabled to connect to server.'))
    }
    if (error.response.data.email) {
      return dispatch(signupFail('User with that email address already exists.'))
    }
    return dispatch(signupFail('Something went wrong.'));
  } )
});
