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

export const LOGOUT = 'LOGOUT'
export function logout() {
  window.localStorage.removeItem('operationally-token')
  history.push('/')
  return {
    type: LOGOUT
  }
}


export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export function loginRequest() {
  return {
    type: LOGIN_REQUEST
  }
}


export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export function loginSuccess(token, user) {
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
export function loginFail(error) {
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


export function login(username, password) {

  return function(dispatch) {
    dispatch(loginRequest())

    const client = axios.create(config)

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
    } )

  }
}


export const SAVE_USER_REQUEST = 'SAVE_USER_REQUEST'
export function saveUserRequest(user) {
  return {
    type: SAVE_USER_REQUEST,
    user: user
  }
}

export const SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS'
export function saveUserSuccess(user) {
  return {
    type: SAVE_USER_SUCCESS,
    user: user
  }
}

export const SAVE_USER_FAIL = 'SAVE_USER_FAIL'
export function saveUserFail(error) {
  console.log(error)
  return {
    type: SAVE_USER_FAIL,
    message: "An error occurred."
  }
}

export function saveUser(user) {

  return function(dispatch) {
    dispatch(saveUserRequest())

    const client = axios.create(getAuthConfig())

    return client.patch(
      '/users/' + user.id + '/', user
    )
    .then( response => dispatch(saveUserSuccess(response.data)) )
    .catch( error => dispatch(saveUserFail(error)) )
  }
}

export const SAVE_ORG_REQUEST = 'SAVE_ORG_REQUEST'
export function saveOrgRequest(org) {
  return {
    type: SAVE_ORG_REQUEST,
    org: org
  }
}

export const SAVE_ORG_SUCCESS = 'SAVE_ORG_SUCCESS'
export function saveOrgSuccess(org) {
  return {
    type: SAVE_ORG_SUCCESS,
    org: org
  }
}

export const SAVE_ORG_FAIL = 'SAVE_ORG_FAIL'
export function saveOrgFail(error) {
  return {
    type: SAVE_ORG_FAIL,
    message: "An error occurred."
  }
}

export function saveOrg(org) {

  return function(dispatch) {
    dispatch(saveOrgRequest())

    const client = axios.create(getAuthConfig())

    return client.patch(
      '/organizations/' + org.id + '/', org
    )
    .then( response => {
      dispatch(saveOrgSuccess(response.data))
    })
    .catch( error => dispatch(saveOrgFail(error)) )
  }
}

export const GET_ORG_REQUEST = 'GET_ORG_REQUEST'
export function getOrgRequest(id) {
  return {
    type: GET_ORG_REQUEST,
    org: id
  }
}

export const GET_ORG_SUCCESS = 'GET_ORG_SUCCESS'
export function getOrgSuccess(org) {
  return {
    type: GET_ORG_SUCCESS,
    org: org
  }
}

export const GET_ORG_FAIL = 'GET_ORG_FAIL'
export function getOrgFail(error) {
  console.log(error)
  return {
    type: GET_ORG_FAIL,
    message: "An error occurred."
  }
}

export function getOrg(id) {

  return function(dispatch) {
    dispatch(getOrgRequest())

    const client = axios.create(getAuthConfig())

    return client.get(
      '/organizations/' + id + '/'
    )
    .then( response => dispatch(getOrgSuccess(response.data)) )
    .catch( error => dispatch(getOrgFail(error)) )
  }
}

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export function signupRequest(user) {
  return {
    type: SIGNUP_REQUEST,
    user: user
  }
}

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export function signupSuccess(user) {
  history.push('/signup/success')
  return {
    type: SIGNUP_SUCCESS,
    user: user
  }
}

export const SIGNUP_FAIL = 'SIGNUP_FAIL'
export function signupFail(error) {
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

export function signup(user) {

  return function(dispatch) {
    dispatch(signupRequest())

    const client = axios.create(config)

    return client.post(
      '/register/', user
    )
    .then( response => {
      dispatch(signupSuccess(response.data))
    })
    .catch( error => dispatch(signupFail(error)) )
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

export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST'
export function addTaskRequest(task) {
  return {
    type: ADD_TASK_REQUEST,
    task: task
  }
}

export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS'
export function addTaskSuccess(task) {
  return {
    type: ADD_TASK_SUCCESS,
    task: task
  }
}

export const ADD_TASK_FAIL = 'ADD_TASK_FAIL'
export function addTaskFail(error) {
  if (error.response) {
    if (error.response.status === 400) {
      return {
        type: ADD_TASK_FAIL,
        errors: error.response.data
      }
    }
  } else {
    return {
      type: ADD_TASK_FAIL,
      errors: {'form': 'Unable to connect'}
    }
  }
}

export function addTask(task) {

  return function(dispatch) {
    dispatch(addTaskRequest())

    const client = axios.create(getAuthConfig())

    return client.post(
      '/tasks/', task
    )
    .then( response => {
      dispatch(addTaskSuccess(response.data))
    })
    .catch( error => dispatch(addTaskFail(error)) )
  }
}

export const GET_TASKS_REQUEST = 'GET_TASKS_REQUEST'
export function getTasksRequest(organization_id) {
  return {
    type: GET_TASKS_REQUEST,
    organization_id: organization_id
  }
}

export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS'
export function getTasksSuccess(tasks) {
  return {
    type: GET_TASKS_SUCCESS,
    tasks: tasks
  }
}

export const GET_TASKS_FAIL = 'GET_TASKS_FAIL'
export function getTasksFail(error) {
  if (error.response) {
    if (error.response.status === 400) {
      return {
        type: GET_TASKS_FAIL,
        errors: error.response.data
      }
    }
  } else {
    return {
      type: GET_TASKS_FAIL,
      errors: {'form': 'Unable to connect'}
    }
  }
}

export function getTasks(organization_id) {

  return function(dispatch) {
    dispatch(getTasksRequest(organization_id))

    const client = axios.create(getAuthConfig())

    return client.get(
      '/tasks/'
    )
    .then( response => {
      dispatch(getTasksSuccess(response.data))
    })
    .catch( error => dispatch(getTasksFail(error)) )
  }
}

export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST'
export function deleteTaskRequest(task_id) {
  return {
    type: DELETE_TASK_REQUEST,
    task: task_id
  }
}

export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS'
export function deleteTaskSuccess(task_id) {
  return {
    type: DELETE_TASK_SUCCESS,
    task_id: task_id
  }
}

export const DELETE_TASK_FAIL = 'DELETE_TASK_FAIL'
export function deleteTaskFail(error) {
  if (error.response) {
    if (error.response.status === 400) {
      return {
        type: DELETE_TASK_FAIL,
        errors: error.response.data
      }
    }
  } else {
    return {
      type: DELETE_TASK_FAIL,
      errors: {'form': 'Unable to connect'}
    }
  }
}

export function deleteTask(task_id) {

  return function(dispatch) {
    dispatch(deleteTaskRequest(task_id))

    const client = axios.create(getAuthConfig())

    return client.delete(
      '/tasks/' + task_id + '/',
    )
    .then( response => {
      dispatch(deleteTaskSuccess(task_id))
    })
    .catch( error => dispatch(deleteTaskFail(error)) )
  }
}
