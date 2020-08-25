import { normalize, schema } from 'normalizr';
import { getClient } from '../apiClient.js';


export const ADD_USER_ROLE_REQUEST = 'ADD_USER_ROLE_REQUEST'
export const addUserRoleRequest = (userRole) => ({
  type: ADD_USER_ROLE_REQUEST,
  userRole: userRole
});

export const ADD_USER_ROLE_SUCCESS = 'ADD_USER_ROLE_SUCCESS'
export const addUserRoleSuccess = (data) => ({
  type: ADD_USER_ROLE_SUCCESS,
  entities: data.entities,
  result: data.result
});

export const ADD_USER_ROLE_FAIL = 'ADD_USER_ROLE_FAIL'
export const addUserRoleFail = (message) => {
  return {
    type: ADD_USER_ROLE_FAIL,
    message: message
  }
}

export const addUserRole = (userRole) => ((dispatch) => {
  dispatch(addUserRoleRequest())

  const client = getClient()

  return client.post(
    '/userroles/', userRole
  )
  .then( response => {
    const userrole = new schema.Entity('userroles', {});
    const normalizedData = normalize(response.data, userrole);
    dispatch(addUserRoleSuccess(normalizedData));
    window.analytics.track('Created a user role.');
  })
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(addUserRoleFail('Unable to connect to server'))
    } else {
      return dispatch(addUserRoleFail('Something went wrong'));
    }
  } )
});

export const GET_USER_ROLES_REQUEST = 'GET_USER_ROLES_REQUEST'
export const getUserRolesRequest = () => ({
  type: GET_USER_ROLES_REQUEST
});

export const GET_USER_ROLES_SUCCESS = 'GET_USER_ROLES_SUCCESS'
export const getUserRolesSuccess = (data) => ({
  type: GET_USER_ROLES_SUCCESS,
  entities: data.entities,
  result: data.result
});

export const GET_USER_ROLES_FAIL = 'GET_USER_ROLES_FAIL'
export const getUserRolesFail = (message) => {
  return {
    type: GET_USER_ROLES_FAIL,
    message: message
  }
}

export const getUserRoles = () => ((dispatch) => {
  dispatch(getUserRolesRequest())

  const client = getClient()

  return client.get(
    '/userroles/'
  )
  .then( response => {
    const userrole = new schema.Entity('userroles', {})
    const normalizedData = normalize(response.data, [userrole])
    dispatch(getUserRolesSuccess(normalizedData))
  })
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(getUserRolesFail('Unable to connect to server'))
    } else {
      return dispatch(getUserRolesFail('Something went wrong'));
    }
  } )
});

export const SAVE_USER_ROLE_REQUEST = 'SAVE_USER_ROLE_REQUEST'
export const saveUserRoleRequest = (userRole) => ({
  type: SAVE_USER_ROLE_REQUEST,
  userRole: userRole
});

export const SAVE_USER_ROLE_SUCCESS = 'SAVE_USER_ROLE_SUCCESS'
export const saveUserRoleSuccess = (data) => ({
  type: SAVE_USER_ROLE_SUCCESS,
  entities: data.entities,
  result: data.result
});

export const SAVE_USER_ROLE_FAIL = 'SAVE_USER_ROLE_FAIL'
export const saveUserRoleFail = (message) => {
  return ({
    type: SAVE_USER_ROLE_FAIL,
    message: message
  });
};

export const saveUserRole = (userRole) => ((dispatch) => {
  dispatch(saveUserRoleRequest())

  const client = getClient()

  return client.patch(
    '/userroles/' + userRole.id + '/', userRole
  )
  .then( response => {
    const userrole = new schema.Entity('userroles', {})
    const normalizedData = normalize(response.data, userrole)
    dispatch(saveUserRoleSuccess(normalizedData));

  })
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(saveUserRoleFail('Unable to connect to server'))
    } else {
      return dispatch(saveUserRoleFail('Something went wrong'));
    }
  } )
});

export const DELETE_USER_ROLE_REQUEST = 'DELETE_USER_ROLE_REQUEST'
export const deleteUserRoleRequest = (userRole_id) => ({
  type: DELETE_USER_ROLE_REQUEST,
  userRole: userRole_id
});

export const DELETE_USER_ROLE_SUCCESS = 'DELETE_USER_ROLE_SUCCESS'
export const deleteUserRoleSuccess = (userRole_id) => ({
  type: DELETE_USER_ROLE_SUCCESS,
  userRole: userRole_id
});

export const DELETE_USER_ROLE_FAIL = 'DELETE_USER_ROLE_FAIL'
export const deleteUserRoleFail = (message) => {
  console.log(message)
  return {
    type: DELETE_USER_ROLE_FAIL,
    message: message
  }
}

export const deleteUserRole = (userRole_id) => ((dispatch) => {
  dispatch(deleteUserRoleRequest(userRole_id))

  const client = getClient()

  return client.delete(
    '/userroles/' + userRole_id + '/',
  )
  .then( response => {
    dispatch(deleteUserRoleSuccess(userRole_id));
    window.analytics.track('Deleted a user role.');
  })
  .catch( error => {
    console.log(error);
    if (!error.response) {
      // No response from server
      dispatch(deleteUserRoleFail('Unable to connect to server'))
    } else {
      return dispatch(deleteUserRoleFail('Something went wrong'));
    }
  } )
});