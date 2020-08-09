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
