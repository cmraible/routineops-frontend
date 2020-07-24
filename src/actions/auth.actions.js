import history from '../history.js';
import { getOrg } from './organization.actions';
import { getClient } from '../apiClient';
import { goToForgotSuccess, goToResetSuccess, goToOnboardUser } from './ui.actions';

export const LOGOUT = 'LOGOUT'
export const logout = () => {
  window.localStorage.removeItem('routineops-token')
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
  // Save the token to localstorage
  window.localStorage.setItem('routineops-token', token)
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

export const login = (email, password) => ((dispatch) => {
  dispatch(loginRequest())

  const client = getClient()

  return client.post(
    '/accounts/login/', {
      email: email,
      password: password
    }
  )
  .then( (response) => {
    dispatch(loginSuccess(response.data.key, response.data.user))
    dispatch(getOrg(response.data.user.organization))
  })
  .catch( (error) => {
    console.log(error)
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
    '/accounts/register/', user
  )
  .then( response => {
    dispatch(signupSuccess(response.data))
    dispatch(loginSuccess(response.data.key, response.data.user))
    dispatch(goToOnboardUser())
  })
  .catch( error => {
    if (!error.response) {
      return dispatch(signupFail('Unable to connect to server.'))
    }
    if (error.response.data.email) {
      return dispatch(signupFail('User with that email address already exists.'))
    }
    return dispatch(signupFail('Something went wrong.'));
  } )
});


export const FORGOT_REQUEST = 'FORGOT_REQUEST'
export const forgotRequest = () => ({
  type: FORGOT_REQUEST
});

export const FORGOT_SUCCESS = 'FORGOT_SUCCESS'
export const forgotSuccess = () => {
  return {
      type: FORGOT_SUCCESS
  }
}

export const FORGOT_FAIL = 'FORGOT_FAIL'
export const forgotFail = (message) => {
  return {
    type: FORGOT_FAIL,
    message: message
  }
}

export const forgot = (email) => ((dispatch) => {
  dispatch(forgotRequest())

  const client = getClient()

  return client.post(
    `/accounts/password/reset/`, {
      email: email
    }
  )
  .then( (response) => {
    dispatch(forgotSuccess())
    dispatch(goToForgotSuccess())
  })
  .catch( (error) => {
    if (!error.response) {
      // No response from server
      dispatch(forgotFail('Unable to connect to server.'))
    } else if (error.response.status === 404) {
      dispatch(forgotFail('User not found.'))
    } else {
      dispatch(forgotFail('Something went wrong.'))
    }
  })
});

export const RESET_REQUEST = 'RESET_REQUEST'
export const resetRequest = () => ({
  type: RESET_REQUEST
});

export const RESET_SUCCESS = 'RESET_SUCCESS'
export const resetSuccess = () => {
  return {
      type: RESET_SUCCESS
  }
}

export const RESET_FAIL = 'RESET_FAIL'
export const resetFail = (message) => {
  return {
    type: RESET_FAIL,
    message: message
  }
}

export const reset = (uid, token, password1, password2) => ((dispatch) => {
  dispatch(resetRequest())

  const client = getClient()

  return client.post(
    `/accounts/password/reset/confirm/`, {
      uid: uid,
      token: token,
      new_password1: password1,
      new_password2: password2
    }
  )
  .then( (response) => {
    dispatch(resetSuccess())
    dispatch(goToResetSuccess())
  })
  .catch( (error) => {
    console.log(error);
    if (!error.response) {
      // No response from server
      dispatch(resetFail('Unable to connect to server.'))
    } else if (error.response.status === 404) {
      dispatch(resetFail('User not found.'))
    } else {
      dispatch(resetFail('Something went wrong.'))
    }
  })
});


export const VERIFY_EMAIL_REQUEST = 'VERIFY_EMAIL_REQUEST'
export const verifyEmailRequest = () => ({
  type: VERIFY_EMAIL_REQUEST
});

export const VERIFY_EMAIL_SUCCESS = 'VERIFY_EMAIL_SUCCESS'
export const verifyEmailSuccess = (data) => {
  return {
      type: VERIFY_EMAIL_SUCCESS,
      user: data.user,
      token: data.token
  }
}

export const VERIFY_EMAIL_FAIL = 'VERIFY_EMAIL_FAIL'
export const verifyEmailFail = (message) => {
  return {
    type: VERIFY_EMAIL_FAIL,
    message: message
  }
}

export const verifyEmail = (key) => ((dispatch) => {
  dispatch(verifyEmailRequest())

  const client = getClient()

  return client.post(
    `/accounts/register/verify-email/`, {
      key: key
    }
  )
  .then( (response) => {
    dispatch(verifyEmailSuccess(response.data))
    dispatch(loginSuccess(response.data.token, response.data.user))
    dispatch(goToOnboardUser())
  })
  .catch( (error) => {
    console.log(error);
    if (!error.response) {
      // No response from server
      dispatch(resetFail('Unable to connect to server.'))
    } else if (error.response.status === 404) {
      dispatch(resetFail('User not found.'))
    } else {
      dispatch(resetFail('Something went wrong.'))
    }
  })
});
