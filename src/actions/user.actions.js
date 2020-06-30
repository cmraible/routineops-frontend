import { getClient } from '../apiClient.js';

export const SAVE_USER_REQUEST = 'SAVE_USER_REQUEST'
export const saveUserRequest = (user) => ({
  type: SAVE_USER_REQUEST,
  user: user
});

export const SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS'
export const saveUserSuccess = (user) => ({
  type: SAVE_USER_SUCCESS,
  user: user
});

export const SAVE_USER_FAIL = 'SAVE_USER_FAIL'
export const saveUserFail = (error) => ({
  type: SAVE_USER_FAIL,
  message: "An error occurred."
});

export const saveUser = (user) => ((dispatch) => {
  dispatch(saveUserRequest())

  const client = getClient()

  return client.patch(
    '/users/' + user.id + '/', user
  )
  .then( response => dispatch(saveUserSuccess(response.data)) )
  .catch( error => dispatch(saveUserFail(error)) )
});
