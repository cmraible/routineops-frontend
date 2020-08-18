import history from '../history.js';
import { getOrg } from './organization.actions';
import { getClient } from '../apiClient';
import { goToForgotSuccess, goToResetSuccess, goToOnboardUser } from './ui.actions';
import { saveUserSuccess } from './user.actions';
import { normalize, schema } from 'normalizr';

export const LOGOUT = 'LOGOUT'
export const logout = () => {
  window.localStorage.removeItem('routineops-token')
  history.push('/');
  window.analytics.track('Logged out.');
  window.analytics.reset();
  window.Intercom('shutdown');
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
  window.analytics.identify(user.id, {
    'firstName': user.first_name,
    'lastName': user.last_name,
    'name': user.first_name + ' ' + user.last_name,
    'email': user.email,
    'phone': user.phone,
    'invitation': user.invitation,
    'is_org_owner': user.is_org_owner,
    'is_org_admin': user.is_org_admin,
    'is_active': user.is_active,
    'createdAt': user.date_joined,
    'last_login': user.last_login,
    'is_staff': user.is_staff,
    'is_superuser': user.is_superuser,
    'onboardComplete': user.onboard_complete,
    'organization_id': user.organization,
    'company': {
      'id': user.organization,
      'organization_id': user.organization
    }
  }, {
    Intercom: {
       user_hash: user.intercom_hash
    }
  });
  window.analytics.group(user.organization, {
    id: user.organization,
    organization_id: user.organization
  })
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
    console.log(response.data)
    const user = new schema.Entity('users', {})
    const normalizedData = normalize(response.data.user, user)
    dispatch(saveUserSuccess(normalizedData))
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
export const signupSuccess = (data) => {

  return {
    type: SIGNUP_SUCCESS,
    entities: data.entities,
    result: data.result
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
    console.log(response)
    const user = new schema.Entity('users', {})
    const data = response.data.user
    const normalizedData = normalize(data, user)
    dispatch(signupSuccess(normalizedData));
    window.analytics.alias(data.id)
    window.analytics.identify(data.id, {
      'firstName': data.first_name,
      'lastName': data.last_name,
      'name': data.first_name + ' ' + data.last_name,
      'email': data.email,
      'phone': data.phone,
      'invitation': data.invitation,
      'is_org_owner': data.is_org_owner,
      'is_org_admin': data.is_org_admin,
      'is_active': data.is_active,
      'createdAt': data.date_joined,
      'last_login': data.last_login,
      'is_staff': data.is_staff,
      'is_superuser': data.is_superuser,
      'onboardComplete': data.onboard_complete,
      'organization_id': data.organization,
      'company': {
        'id': data.organization,
        'organization_id': data.organization
      }
    }, {
      Intercom: {
         user_hash: data.intercom_hash
      }
    });
    window.analytics.group(data.organization, {
      'organization_id': data.organization
    })
    if (response.data.user.is_org_owner) {
      window.analytics.track('Account Created', {
        context: {groupId: response.data.user.organization
        }
      });
    }
    dispatch(loginSuccess(response.data.key, response.data.user));
    dispatch(getOrg(response.data.user.organization));
    dispatch(goToOnboardUser());
  })
  .catch( error => {
    console.log(error)
    if (!error.response) {
      return dispatch(signupFail('Unable to connect to server.'))
    }
    if (error.response.data.email) {
      return dispatch(signupFail('User with that email address already exists.'))
    }
    if (error.response.data.invitation) {
      return dispatch(signupFail('Invalid invitation.'));
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