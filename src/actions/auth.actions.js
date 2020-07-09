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
export const loginFail = (error) => {
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
    console.log(error.response)
    dispatch(loginFail(error))
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
export const signupFail = (error) => {
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
  .catch( error => dispatch(signupFail(error)) )
});
