import history from './history.js';
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
  history.push('/login')
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

export const SAVE_PROFILE_REQUEST = 'SAVE_PROFILE_REQUEST'
export function saveProfileRequest(profile) {
  return {
    type: SAVE_PROFILE_REQUEST,
    profile: profile
  }
}

export const SAVE_PROFILE_SUCCESS = 'SAVE_PROFILE_SUCCESS'
export function saveProfileSuccess(profile) {
  return {
    type: SAVE_PROFILE_SUCCESS,
    profile: profile
  }
}

export const SAVE_PROFILE_FAIL = 'SAVE_PROFILE_FAIL'
export function saveProfileFail(error) {
  console.log(error)
  return {
    type: SAVE_PROFILE_FAIL,
    message: "An error occurred."
  }
}

export function saveProfile(profile) {

  return function(dispatch) {
    dispatch(saveProfileRequest())

    return client.post(
      '/users/', profile
    )
    .then( response => dispatch(saveProfileSuccess(response.data)) )
    .catch( error => dispatch(saveProfileFail(error)))
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
      '/users/'
    )
    .then( response => {
      dispatch(getUserSuccess(response.data))
    })
    .catch( error => {
      dispatch(getUserFail(error))
    })
  }
}
