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
export const addRoleFail = (error) => {
  if (error.response) {
    if (error.response.status === 400) {
      return {
        type: ADD_ROLE_FAIL,
        errors: error.response.data
      }
    }
  } else {
    return {
      type: ADD_ROLE_FAIL,
      errors: {'form': 'Unable to connect'}
    }
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
  })
  .catch( error => dispatch(addRoleFail(error)) )
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
export const getRolesFail = (error) => {
  if (error.response) {
    if (error.response.status === 400) {
      return {
        type: GET_ROLES_FAIL,
        errors: error.response.data
      }
    }
  } else {
    return {
      type: GET_ROLES_FAIL,
      errors: {'form': 'Unable to connect'}
    }
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
  .catch( error => dispatch(getRolesFail(error)) )
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
export const saveRoleFail = (error) => {
  console.log(error)
  return ({
    type: SAVE_ROLE_FAIL,
    message: "An error occurred."
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
  .catch( error => dispatch(saveRoleFail(error)) )
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
export const deleteRoleFail = (error) => {
  console.log(error)
  if (error.response) {
    if (error.response.status === 400) {
      return {
        type: DELETE_ROLE_FAIL,
        errors: error.response.data
      }
    }
  } else {
    return {
      type: DELETE_ROLE_FAIL,
      errors: {'form': 'Unable to connect'}
    }
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
  .catch( error => dispatch(deleteRoleFail(error)) )
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
export const getRoleFail = (error) => {
  console.log(error);
  if (error.response) {
    if (error.response.status === 400) {
      return {
        type: GET_ROLE_FAIL,
        errors: error.response.data
      }
    }
  } else {
    return {
      type: GET_ROLE_FAIL,
      errors: {'form': 'Unable to connect'}
    }
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
  .catch( error => dispatch(getRoleFail(error)) )
});
