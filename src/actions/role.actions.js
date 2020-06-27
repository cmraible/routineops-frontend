import history from '../history.js';

const axios = require('axios').default;

// Get API host from env variable, then get api baseurl
const host = process.env.REACT_APP_API_HOST
const baseUrl = host + '/api'

// Create axios client with baseUrl and auth headers above
const config = {
  baseURL: baseUrl,
  timeout: 1000,
};

const getToken = () => {
  return window.localStorage.getItem('operationally-token')
}

const getAuthConfig = () => {
  return {
    headers: {'Authorization': 'Token ' + getToken() },
    ...config
  }
}

export const ADD_ROLE_REQUEST = 'ADD_ROLE_REQUEST'
export function addRoleRequest(role) {
  return {
    type: ADD_ROLE_REQUEST,
    role: role
  }
}

export const ADD_ROLE_SUCCESS = 'ADD_ROLE_SUCCESS'
export function addRoleSuccess(role) {
  return {
    type: ADD_ROLE_SUCCESS,
    role: role
  }
}

export const ADD_ROLE_FAIL = 'ADD_ROLE_FAIL'
export function addRoleFail(error) {
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

export function addRole(role) {

  return function(dispatch) {
    dispatch(addRoleRequest())

    const client = axios.create(getAuthConfig())

    return client.post(
      '/roles/', role
    )
    .then( response => {
      dispatch(addRoleSuccess(response.data))
    })
    .catch( error => dispatch(addRoleFail(error)) )
  }
}

export const GET_ROLES_REQUEST = 'GET_ROLES_REQUEST'
export function getRolesRequest(organization_id) {
  return {
    type: GET_ROLES_REQUEST,
    organization_id: organization_id
  }
}

export const GET_ROLES_SUCCESS = 'GET_ROLES_SUCCESS'
export function getRolesSuccess(roles) {
  return {
    type: GET_ROLES_SUCCESS,
    roles: roles
  }
}

export const GET_ROLES_FAIL = 'GET_ROLES_FAIL'
export function getRolesFail(error) {
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

export function getRoles(organization_id) {

  return function(dispatch) {
    dispatch(getRolesRequest(organization_id))

    const client = axios.create(getAuthConfig())

    return client.get(
      '/roles/'
    )
    .then( response => {
      dispatch(getRolesSuccess(response.data))
    })
    .catch( error => dispatch(getRolesFail(error)) )
  }
}

export const DELETE_ROLE_REQUEST = 'DELETE_ROLE_REQUEST'
export function deleteRoleRequest(role_id) {
  return {
    type: DELETE_ROLE_REQUEST,
    role: role_id
  }
}

export const DELETE_ROLE_SUCCESS = 'DELETE_ROLE_SUCCESS'
export function deleteRoleSuccess(role_id) {
  return {
    type: DELETE_ROLE_SUCCESS,
    role_id: role_id
  }
}

export const DELETE_ROLE_FAIL = 'DELETE_ROLE_FAIL'
export function deleteRoleFail(error) {
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

export function deleteRole(role_id) {

  return function(dispatch) {
    dispatch(deleteRoleRequest(role_id))

    const client = axios.create(getAuthConfig())

    return client.delete(
      '/roles/' + role_id + '/',
    )
    .then( response => {
      dispatch(deleteRoleSuccess(role_id))
    })
    .catch( error => dispatch(deleteRoleFail(error)) )
  }
}
