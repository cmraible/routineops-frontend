import history from '../history.js';
import { goToLogin } from './ui.actions';
const axios = require('axios').default;



// Get API host from env variable, then get api baseurl
const host = process.env.REACT_APP_API_HOST
const baseUrl = host + '/api'


// Create axios client with baseUrl and auth headers above
const client = axios.create({
  baseURL: baseUrl,
  timeout: 1000
});


export const LOGOUT = 'LOGOUT'
export function logout() {
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
  return {
      type: LOGIN_SUCCESS,
      token: token,
      user: user
  }
}

export const LOGIN_FAIL = 'LOGIN_FAIL'
export function loginFail(error) {
  if (error.response) {

  } else {
    return {
      type: LOGIN_FAIL,
      message: 'Unable to connect.'
    }
  }
  if (error.response.status === 400) {
    return {
      type: LOGIN_FAIL,
      message: 'Incorrect username or password.'
    }
  } else {
    return {
      type: LOGIN_FAIL,
      message: 'Login failed for an unknown reason.'
    }
  }
}


export function login(username, password) {

  return function(dispatch) {
    dispatch(loginRequest())

    return client.post(
      '/auth_token/', {
        username: username,
        password: password
      }
    )
    .then( (response) => {
      console.log(response)
      dispatch(loginSuccess(response.data.token, response.data.user))
      dispatch(getOrg(response.data.user.organization))
    })
    .catch( (error) => {
      dispatch(loginFail(error))
    } )

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
export function addTaskFail(task) {
  return {
    type: ADD_TASK_FAIL,
    task: task
  }
}

export function addTask(task) {

  return function(dispatch) {
    dispatch(addTaskRequest())

    return client.post(
      '/task/', task
    )
    .then( response => response.data )
    .then( data => dispatch(addTaskSuccess(data)) )
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
    console.log(user)
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
    return client.patch(
      '/organizations/' + org.id + '/', org
    )
    .then( response => dispatch(saveOrgSuccess(response.data)) )
    .catch( error => dispatch(saveOrgFail(error)) )
  }
}

export const GET_ORG_REQUEST = 'GET_ORG_REQUEST'
export function getOrgRequest(org) {
  return {
    type: GET_ORG_REQUEST,
    org: org
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
  return {
    type: SIGNUP_SUCCESS,
    user: user
  }
}

export const SIGNUP_FAIL = 'SIGNUP_FAIL'
export function signupFail(error) {
  console.log(error)
  return {
    type: SIGNUP_FAIL,
    message: "An error occurred."
  }
}

export function signup(user) {

  return function(dispatch) {
    dispatch(signupRequest())
    return client.post(
      '/users/', user
    )
    .then( response => {
      dispatch(signupSuccess(response.data))
      dispatch(goToLogin())
    })
    .catch( error => dispatch(signupFail(error)) )
  }
}