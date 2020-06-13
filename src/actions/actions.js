import history from '../history.js';
const axios = require('axios').default;



// Get API host from env variable, then get api baseurl
const host = process.env.REACT_APP_API_HOST
const baseUrl = host + '/api'


// Create axios client with baseUrl and auth headers above
const client = axios.create({
  baseURL: baseUrl,
  timeout: 1000
});


export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE'
export function toggleDarkMode() {
  return {
    type: TOGGLE_DARK_MODE
  }
}


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


export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export function getUserRequest(user) {
  return {
    type: GET_USER_REQUEST,
    user: user
  }
}

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export function getUserSuccess(user) {
  return {
    type: GET_USER_SUCCESS,
    user: user
  }
}

export const GET_USER_FAIL = 'GET_USER_FAIL'
export function getUserFail(user) {
  return {
    type: GET_USER_FAIL,
    user: user
  }
}

export function getUser(user) {

  return function(dispatch) {
    dispatch(getUserRequest())


    return client.get(
      '/users/' + user.id + '/'
    )
    .then( response => {
      console.log(response.data)
      dispatch(getUserSuccess(response.data))
    })
    .catch( error => {
      dispatch(getUserFail(error))
    })
  }
}

export const GO_TO_PROFILE = 'GO_TO_PROFILE'
export function goToProfile() {
  history.push('/profile')
  return {
    type: GO_TO_PROFILE
  }
}

export const GO_TO_ORG = 'GO_TO_ORG'
export function goToOrg() {
  history.push('/organization')
  return {
    type: GO_TO_ORG
  }
}
