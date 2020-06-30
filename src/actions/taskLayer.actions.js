import { normalize, schema } from 'normalizr'
import { getClient } from '../apiClient.js';


export const ADD_TASK_LAYER_REQUEST = 'ADD_TASK_LAYER_REQUEST'
export const addTaskLayerRequest = (taskLayer) => ({
  type: ADD_TASK_LAYER_REQUEST,
  taskLayer: taskLayer
});

export const ADD_TASK_LAYER_SUCCESS = 'ADD_TASK_LAYER_SUCCESS'
export const addTaskLayerSuccess = (taskLayer) => ({
  type: ADD_TASK_LAYER_SUCCESS,
  taskLayer: taskLayer
});

export const ADD_TASK_LAYER_FAIL = 'ADD_TASK_LAYER_FAIL'
export const addTaskLayerFail = (error) => {
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

export const addTaskLayer = (taskLayer) => ((dispatch) => {
  dispatch(addTaskLayerRequest())

  const client = getClient()

  return client.post(
    '/tasklayers/', taskLayer
  )
  .then( response => {

    dispatch(addTaskLayerSuccess(response.data))
  })
  .catch( error => dispatch(addTaskLayerFail(error)) )
});

export const GET_TASK_LAYERS_REQUEST = 'GET_TASK_LAYERS_REQUEST'
export const getTaskLayersRequest = (organization_id) => ({
  type: GET_TASK_LAYERS_REQUEST,
  organization_id: organization_id
});

export const GET_TASK_LAYERS_SUCCESS = 'GET_TASK_LAYERS_SUCCESS'
export const getTaskLayersSuccess = (taskLayers) => ({
  type: GET_TASK_LAYERS_SUCCESS,
  taskLayers: taskLayers
});

export const GET_TASK_LAYERS_FAIL = 'GET_TASK_LAYERS_FAIL'
export const getTaskLayersFail = (error) => {
  console.log(error)
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

export const getTaskLayers = (organization_id) => ((dispatch) => {
  dispatch(getTaskLayersRequest(organization_id))

  const client = getClient()

  return client.get(
    '/tasklayers/'
  )
  .then( response => {
    const taskLayer = new schema.Entity('taskLayers', {})
    const normalizedData = normalize(response.data, [taskLayer])
    console.log(normalizedData)
    dispatch(getTaskLayersSuccess(normalizedData))
  })
  .catch( error => dispatch(getTaskLayersFail(error)) )
});

export const SAVE_TASK_LAYER_REQUEST = 'SAVE_TASK_LAYER_REQUEST'
export const saveTaskLayerRequest = (taskLayer) => ({
  type: SAVE_TASK_LAYER_REQUEST,
  taskLayer: taskLayer
});

export const SAVE_TASK_LAYER_SUCCESS = 'SAVE_TASK_LAYER_SUCCESS'
export const saveTaskLayerSuccess = (taskLayer) => ({
  type: SAVE_TASK_LAYER_SUCCESS,
  taskLayer: taskLayer
});

export const SAVE_TASK_LAYER_FAIL = 'SAVE_TASK_LAYER_FAIL'
export const saveTaskLayerFail = (error) => ({
  type: SAVE_TASK_LAYER_FAIL,
  message: "An error occurred."
});

export const saveTaskLayer = (taskLayer) => ((dispatch) => {
  dispatch(saveTaskLayerRequest())
  const client = getClient()
  
  return client.patch(
    '/tasklayers/' + taskLayer.id + '/', taskLayer
  )
  .then( response => dispatch(saveTaskLayerSuccess(response.data)) )
  .catch( error => dispatch(saveTaskLayerFail(error)) )
});

export const DELETE_TASK_LAYER_REQUEST = 'DELETE_TASK_LAYER_REQUEST'
export const deleteTaskLayerRequest = (taskLayer_id) => ({
  type: DELETE_TASK_LAYER_REQUEST,
  taskLayer: taskLayer_id
});

export const DELETE_TASK_LAYER_SUCCESS = 'DELETE_TASK_LAYER_SUCCESS'
export const deleteTaskLayerSuccess = (taskLayer_id) => ({
  type: DELETE_TASK_LAYER_SUCCESS,
  taskLayer: taskLayer_id
});

export const DELETE_TASK_LAYER_FAIL = 'DELETE_TASK_LAYER_FAIL'
export const deleteTaskLayerFail = (error) => {
  console.log(error)
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

export const deleteTaskLayer = (taskLayer_id) => ((dispatch) => {
  dispatch(deleteTaskLayerRequest(taskLayer_id))

  const client = getClient()

  return client.delete(
    '/tasklayers/' + taskLayer_id + '/',
  )
  .then( response => {
    dispatch(deleteTaskLayerSuccess(taskLayer_id))
  })
  .catch( error => dispatch(deleteTaskLayerFail(error)) )
});