import { getClient } from '../apiClient.js';
import { normalize, schema } from 'normalizr';

export const SAVE_USER_REQUEST = 'SAVE_USER_REQUEST'
export const saveUserRequest = (user) => ({
  type: SAVE_USER_REQUEST,
  user: user
});

export const SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS'
export const saveUserSuccess = (data) => ({
  type: SAVE_USER_SUCCESS,
  entities: data.entities,
  result: data.result
});

export const SAVE_USER_FAIL = 'SAVE_USER_FAIL'
export const saveUserFail = (message) => ({
  type: SAVE_USER_FAIL,
  message: message
});

export const saveUser = (user) => ((dispatch) => {
  dispatch(saveUserRequest())

  const client = getClient()

  return client.patch(
    '/users/' + user.id + '/', user
  )
  .then( response => {
    const user = new schema.Entity('users', {})
    const normalizedData = normalize(response.data, user)
    dispatch(saveUserSuccess(normalizedData));
  } )
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(saveUserFail('Unable to connect to server.'))
    } else {
      return dispatch(saveUserFail('Something went wrong.'));
    }
  })
});

export const UPDATE_USER_PHONE_REQUEST = 'UPDATE_USER_PHONE_REQUEST'
export const updateUserPhoneRequest = (user, phone) => ({
  type: updateUserPhoneRequest,
  user: user,
  phone: phone
});

export const UPDATE_USER_PHONE_SUCCESS = 'UPDATE_USER_PHONE_SUCCESS'
export const updateUserPhoneSuccess = (data) => ({
  type: UPDATE_USER_PHONE_SUCCESS,
  entities: data.entities,
  result: data.result
});

export const UPDATE_USER_PHONE_FAIL = 'UPDATE_USER_PHONE_FAIL'
export const updateUserPhoneFail = (message) => ({
  type: UPDATE_USER_PHONE_FAIL,
  message: message
});

export const updateUserPhone = (user, phone) => ((dispatch) => {
  dispatch(updateUserPhoneRequest(user, phone))

  const client = getClient()

  return client.patch(
    '/users/' + user.id + '/phone/', {phone: phone}
  )
  .then( response => {
    const user = new schema.Entity('users', {})
    const normalizedData = normalize(response.data, user)
    dispatch(updateUserPhoneSuccess(normalizedData));
  } )
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(updateUserPhoneFail('Unable to connect to server.'))
    } else {
      return dispatch(updateUserPhoneFail('Something went wrong.'));
    }
  })
});

export const VERIFY_USER_PHONE_REQUEST = 'VERIFY_USER_PHONE_REQUEST'
export const verifyUserPhoneRequest = (user, phone, code) => ({
  type: VERIFY_USER_PHONE_REQUEST,
  user: user,
  phone: phone
});

export const VERIFY_USER_PHONE_SUCCESS = 'VERIFY_USER_PHONE_SUCCESS'
export const verifyUserPhoneSuccess = (data) => ({
  type: VERIFY_USER_PHONE_SUCCESS,
  entities: data.entities,
  result: data.result
});

export const VERIFY_USER_PHONE_FAIL = 'VERIFY_USER_PHONE_FAIL'
export const verifyUserPhoneFail = (message) => ({
  type: VERIFY_USER_PHONE_FAIL,
  message: message
});

export const verifyUserPhone = (user, phone, code) => ((dispatch) => {
  dispatch(verifyUserPhoneRequest(user, phone, code))

  const client = getClient()

  return client.post(
    '/users/' + user.id + '/verifyphone/', {to: phone, check: code}
  )
  .then( response => {
    const user = new schema.Entity('users', {})
    const normalizedData = normalize(response.data, user)
    dispatch(verifyUserPhoneSuccess(normalizedData));
  } )
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(verifyUserPhoneFail('Unable to connect to server.'))
    } else {
      return dispatch(verifyUserPhoneFail('Something went wrong.'));
    }
  })
});


export const GET_USERS_REQUEST = 'GET_USERS_REQUEST'
export const getUsersRequest = () => ({
  type: GET_USERS_REQUEST
});

export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
export const getUsersSuccess = (data) => ({
  type: GET_USERS_SUCCESS,
  entities: data.entities,
  result: data.result
});

export const GET_USERS_FAIL = 'GET_USERS_FAIL'
export const getUsersFail = (message) => {
  return {
    type: GET_USERS_FAIL,
    message: message
  }
}

export const getUsers = () =>  ((dispatch) => {
  dispatch(getUsersRequest())

  const client = getClient()

  return client.get(
    '/users/'
  )
  .then( response => {
    const user = new schema.Entity('users', {})
    const normalizedData = normalize(response.data, [user])
    dispatch(getUsersSuccess(normalizedData))
  })
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(getUsersFail('Unable to connect to server'))
    } else {
      return dispatch(getUsersFail('Something went wrong'));
    }
  } )
});
