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
