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

export const ADD_TASK_LAYER_REQUEST = 'ADD_TASK_LAYER_REQUEST'
export function addTaskLayerRequest(taskLayer) {
  return {
    type: ADD_TASK_LAYER_REQUEST,
    taskLayer: taskLayer
  }
}

export const ADD_TASK_LAYER_SUCCESS = 'ADD_TASK_LAYER_SUCCESS'
export function addTaskLayerSuccess(taskLayer) {
  return {
    type: ADD_TASK_LAYER_SUCCESS,
    taskLayer: taskLayer
  }
}

export const ADD_TASK_LAYER_FAIL = 'ADD_TASK_LAYER_FAIL'
export function addTaskLayerFail(error) {
  if (error.response) {
    if (error.response.status === 400) {
      return {
        type: ADD_TASK_LAYER_FAIL,
        errors: error.response.data
      }
    }
  } else {
    return {
      type: ADD_TASK_LAYER_FAIL,
      errors: {'form': 'Unable to connect'}
    }
  }
}

export function addTaskLayer(taskLayer) {

  return function(dispatch) {
    dispatch(addTaskLayerRequest())

    const client = axios.create(getAuthConfig())

    return client.post(
      '/tasklayers/', taskLayer
    )
    .then( response => {
      dispatch(addTaskLayerSuccess(response.data))
    })
    .catch( error => dispatch(addTaskLayerFail(error)) )
  }
}

export const GET_TASK_LAYERS_REQUEST = 'GET_TASK_LAYERS_REQUEST'
export function getTaskLayersRequest(organization_id) {
  return {
    type: GET_TASK_LAYERS_REQUEST,
    organization_id: organization_id
  }
}

export const GET_TASK_LAYERS_SUCCESS = 'GET_TASK_LAYERS_SUCCESS'
export function getTaskLayersSuccess(taskLayers) {
  return {
    type: GET_TASK_LAYERS_SUCCESS,
    taskLayers: taskLayers
  }
}

export const GET_TASK_LAYERS_FAIL = 'GET_TASK_LAYERS_FAIL'
export function getTaskLayersFail(error) {
  if (error.response) {
    if (error.response.status === 400) {
      return {
        type: GET_TASK_LAYERS_FAIL,
        errors: error.response.data
      }
    }
  } else {
    return {
      type: GET_TASK_LAYERS_FAIL,
      errors: {'form': 'Unable to connect'}
    }
  }
}

export function getTaskLayers(organization_id) {

  return function(dispatch) {
    dispatch(getTaskLayersRequest(organization_id))

    const client = axios.create(getAuthConfig())

    return client.get(
      '/tasklayers/'
    )
    .then( response => {
      dispatch(getTaskLayersSuccess(response.data))
    })
    .catch( error => dispatch(getTaskLayersFail(error)) )
  }
}

export const SAVE_TASK_LAYER_REQUEST = 'SAVE_TASK_LAYER_REQUEST'
export function saveTaskLayerRequest(taskLayer) {
  return {
    type: SAVE_TASK_LAYER_REQUEST,
    taskLayer: taskLayer
  }
}

export const SAVE_TASK_LAYER_SUCCESS = 'SAVE_TASK_LAYER_SUCCESS'
export function saveTaskLayerSuccess(taskLayer) {
  return {
    type: SAVE_TASK_LAYER_SUCCESS,
    taskLayer: taskLayer
  }
}

export const SAVE_TASK_LAYER_FAIL = 'SAVE_TASK_LAYER_FAIL'
export function saveTaskLayerFail(error) {
  console.log(error)
  return {
    type: SAVE_TASK_LAYER_FAIL,
    message: "An error occurred."
  }
}

export function saveTaskLayer(taskLayer) {

  return function(dispatch) {
    dispatch(saveTaskLayerRequest())

    const client = axios.create(getAuthConfig())

    return client.patch(
      '/tasklayers/' + taskLayer.id + '/', taskLayer
    )
    .then( response => dispatch(saveTaskLayerSuccess(response.data)) )
    .catch( error => dispatch(saveTaskLayerFail(error)) )
  }
}

export const DELETE_TASK_LAYER_REQUEST = 'DELETE_TASK_LAYER_REQUEST'
export function deleteTaskLayerRequest(taskLayer_id) {
  return {
    type: DELETE_TASK_LAYER_REQUEST,
    taskLayer: taskLayer_id
  }
}

export const DELETE_TASK_LAYER_SUCCESS = 'DELETE_TASK_LAYER_SUCCESS'
export function deleteTaskLayerSuccess(taskLayer_id) {
  return {
    type: DELETE_TASK_LAYER_SUCCESS,
    taskLayer_id: taskLayer_id
  }
}

export const DELETE_TASK_LAYER_FAIL = 'DELETE_TASK_LAYER_FAIL'
export function deleteTaskLayerFail(error) {
  if (error.response) {
    if (error.response.status === 400) {
      return {
        type: DELETE_TASK_LAYER_FAIL,
        errors: error.response.data
      }
    }
  } else {
    return {
      type: DELETE_TASK_LAYER_FAIL,
      errors: {'form': 'Unable to connect'}
    }
  }
}

export function deleteTaskLayer(taskLayer_id) {

  return function(dispatch) {
    dispatch(deleteTaskLayerRequest(taskLayer_id))

    const client = axios.create(getAuthConfig())

    return client.delete(
      '/tasklayers/' + taskLayer_id + '/',
    )
    .then( response => {
      dispatch(deleteTaskLayerSuccess(taskLayer_id))
    })
    .catch( error => dispatch(deleteTaskLayerFail(error)) )
  }
}
