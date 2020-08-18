import { normalize, schema } from 'normalizr';
import { getClient } from '../apiClient.js';


export const ADD_ROLE_REQUEST = 'ADD_ROLE_REQUEST'
export const addRoleRequest = (role) => ({
  type: ADD_ROLE_REQUEST,
  role: role
});

export const ADD_ROLE_SUCCESS = 'ADD_ROLE_SUCCESS'
export const addRoleSuccess = (data) => ({
  type: ADD_ROLE_SUCCESS,
  entities: data.entities,
  result: data.result
});

export const ADD_ROLE_FAIL = 'ADD_ROLE_FAIL'
export const addRoleFail = (message) => {
  return {
    type: ADD_ROLE_FAIL,
    message: message
  }
}

export const addRole = (role) => ((dispatch) => {
  dispatch(addRoleRequest())

  const client = getClient()

  return client.post(
    '/roles/', role
  )
  .then( response => {
    const role = new schema.Entity('roles', {})
    const normalizedData = normalize(response.data, role)
    dispatch(addRoleSuccess(normalizedData))
    window.analytics.track('Added a role.', {name: role.name})
  })
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(addRoleFail('Unable to connect to server'))
    } else {
      return dispatch(addRoleFail('Something went wrong'));
    }
  } )
});

export const GET_ROLES_REQUEST = 'GET_ROLES_REQUEST'
export const getRolesRequest = (organization_id) => ({
  type: GET_ROLES_REQUEST,
  organization_id: organization_id
});

export const GET_ROLES_SUCCESS = 'GET_ROLES_SUCCESS'
export const getRolesSuccess = (data) => ({
  type: GET_ROLES_SUCCESS,
  entities: data.entities,
  result: data.result
});

export const GET_ROLES_FAIL = 'GET_ROLES_FAIL'
export const getRolesFail = (message) => {
  return {
    type: GET_ROLES_FAIL,
    message: message
  }
}

export const getRoles = (organization_id) => ((dispatch) => {
  dispatch(getRolesRequest(organization_id))

  const client = getClient()

  return client.get(
    '/roles/'
  )
  .then( response => {
    const role = new schema.Entity('roles', {})
    const normalizedData = normalize(response.data, [role])
    dispatch(getRolesSuccess(normalizedData))
  })
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(getRolesFail('Unable to connect to server'))
    } else {
      return dispatch(getRolesFail('Something went wrong'));
    }
  } )
});

export const SAVE_ROLE_REQUEST = 'SAVE_ROLE_REQUEST'
export const saveRoleRequest = (role) => ({
  type: SAVE_ROLE_REQUEST,
  role: role
});

export const SAVE_ROLE_SUCCESS = 'SAVE_ROLE_SUCCESS'
export const saveRoleSuccess = (data) => ({
  type: SAVE_ROLE_SUCCESS,
  entities: data.entities,
  result: data.result
});

export const SAVE_ROLE_FAIL = 'SAVE_ROLE_FAIL'
export const saveRoleFail = (message) => {
  return ({
    type: SAVE_ROLE_FAIL,
    message: message
  });
};

export const saveRole = (role) => ((dispatch) => {
  dispatch(saveRoleRequest())

  const client = getClient()

  return client.patch(
    '/roles/' + role.id + '/', role
  )
  .then( response => {
    const role = new schema.Entity('roles', {})
    const normalizedData = normalize(response.data, role)
    dispatch(saveRoleSuccess(normalizedData))
  })
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(saveRoleFail('Unable to connect to server'))
    } else {
      return dispatch(saveRoleFail('Something went wrong'));
    }
  } )
});

export const DELETE_ROLE_REQUEST = 'DELETE_ROLE_REQUEST'
export const deleteRoleRequest = (role_id) => ({
  type: DELETE_ROLE_REQUEST,
  role: role_id
});

export const DELETE_ROLE_SUCCESS = 'DELETE_ROLE_SUCCESS'
export const deleteRoleSuccess = (role_id) => ({
  type: DELETE_ROLE_SUCCESS,
  role: role_id
});

export const DELETE_ROLE_FAIL = 'DELETE_ROLE_FAIL'
export const deleteRoleFail = (message) => {
  return {
    type: DELETE_ROLE_FAIL,
    message: message
  }
}

export const deleteRole = (role_id) => ((dispatch) => {
  dispatch(deleteRoleRequest(role_id))

  const client = getClient()

  return client.delete(
    '/roles/' + role_id + '/',
  )
  .then( response => {
    dispatch(deleteRoleSuccess(role_id))
  })
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(deleteRoleFail('Unable to connect to server'))
    } else {
      return dispatch(deleteRoleFail('Something went wrong'));
    }
  } )
});

export const GET_ROLE_REQUEST = 'GET_ROLE_REQUEST'
export const getRoleRequest = (role_id) => ({
  type: GET_ROLE_REQUEST,
  role_id: role_id
});

export const GET_ROLE_SUCCESS = 'GET_ROLE_SUCCESS'
export const getRoleSuccess = (data) => ({
  type: GET_ROLE_SUCCESS,
  entities: data.entities,
  result: data.result
});

export const GET_ROLE_FAIL = 'GET_ROLE_FAIL'
export const getRoleFail = (message) => {
  return {
    type: GET_ROLE_FAIL,
    message: message
  }
}

export const getRole = (role_id) =>  ((dispatch) => {
  dispatch(getRoleRequest(role_id))

  const client = getClient()

  return client.get(
    '/roles/' + role_id
  )
  .then( response => {
    const check = new schema.Entity('roles', {})
    const normalizedData = normalize(response.data, check)
    dispatch(getRoleSuccess(normalizedData))
  })
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(getRoleFail('Unable to connect to server'))
    } else {
      return dispatch(getRoleFail('Something went wrong'));
    }
  } )
});
