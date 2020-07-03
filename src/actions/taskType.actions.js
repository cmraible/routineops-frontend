import { normalize, schema } from 'normalizr';
import { getClient } from '../apiClient.js';


export const ADD_TASK_TYPE_REQUEST = 'ADD_TASK_TYPE_REQUEST'
export const addTaskTypeRequest = (taskType) => ({
  type: ADD_TASK_TYPE_REQUEST,
  taskType: taskType
});


export const ADD_TASK_TYPE_SUCCESS = 'ADD_TASK_TYPE_SUCCESS'
export const addTaskTypeSuccess = (taskType) => ({
  type: ADD_TASK_TYPE_SUCCESS,
  taskType: taskType
});

export const ADD_TASK_TYPE_FAIL = 'ADD_TASK_TYPE_FAIL'
export const addTaskTypeFail = (error) => {
  if (error.response) {
    if (error.response.status === 400) {
      return {
        type: ADD_TASK_TYPE_FAIL,
        errors: error.response.data
      }
    }
  } else {
    return {
      type: ADD_TASK_TYPE_FAIL,
      errors: {'form': 'Unable to connect'}
    }
  }
}

export const addTaskType = (taskType) => ((dispatch) => {
  dispatch(addTaskTypeRequest())

  const client = getClient()

  return client.post(
    '/tasktypes/', taskType
  )
  .then( response => {
    dispatch(addTaskTypeSuccess(response.data))
  })
  .catch( error => dispatch(addTaskTypeFail(error)) )
});

export const GET_TASK_TYPES_REQUEST = 'GET_TASK_TYPES_REQUEST'
export const getTaskTypesRequest = (organization_id) => ({
  type: GET_TASK_TYPES_REQUEST,
  organization_id: organization_id
});

export const GET_TASK_TYPES_SUCCESS = 'GET_TASK_TYPES_SUCCESS'
export const getTaskTypesSuccess = (taskTypes) => ({
  type: GET_TASK_TYPES_SUCCESS,
  taskTypes: taskTypes
});

export const GET_TASK_TYPES_FAIL = 'GET_TASK_TYPES_FAIL'
export const getTaskTypesFail = (error) => {
  console.log(error)
  if (error.response) {
    if (error.response.status === 400) {
      return {
        type: GET_TASK_TYPES_FAIL,
        errors: error.response.data
      }
    }
  } else {
    return {
      type: GET_TASK_TYPES_FAIL,
      errors: {'form': 'Unable to connect'}
    }
  }
}

export const getTaskTypes = (organization_id) =>  ((dispatch) => {
  dispatch(getTaskTypesRequest(organization_id))

  const client = getClient()

  return client.get(
    '/tasktypes/'
  )
  .then( response => {
    const taskType = new schema.Entity('taskTypes', {})
    const normalizedData = normalize(response.data, [taskType])
    dispatch(getTaskTypesSuccess(normalizedData))
  })
  .catch( error => dispatch(getTaskTypesFail(error)) )
});


export const SAVE_TASK_TYPE_REQUEST = 'SAVE_TASK_TYPE_REQUEST'
export const saveTaskTypeRequest = (taskType) => ({
  type: SAVE_TASK_TYPE_REQUEST,
  taskType: taskType
});

export const SAVE_TASK_TYPE_SUCCESS = 'SAVE_TASK_TYPE_SUCCESS'
export const saveTaskTypeSuccess = (taskType) => ({
  type: SAVE_TASK_TYPE_SUCCESS,
  taskType: taskType
});

export const SAVE_TASK_TYPE_FAIL = 'SAVE_TASK_TYPE_FAIL'
export const saveTaskTypeFail = (error) => {
  console.log(error)
  return ({
    type: SAVE_TASK_TYPE_FAIL,
    message: "An error occurred."
  });
};

export const saveTaskType = (taskType) => ((dispatch) => {
  dispatch(saveTaskTypeRequest())

  const client = getClient()

  return client.patch(
    '/tasktypes/' + taskType.id + '/', taskType
  )
  .then( response => {
    
    dispatch(saveTaskTypeSuccess(response.data))
  })
  .catch( error => dispatch(saveTaskTypeFail(error)) )
});


export const DELETE_TASK_TYPE_REQUEST = 'DELETE_TASK_TYPE_REQUEST'
export const deleteTaskTypeRequest = (taskType_id) => ({
  type: DELETE_TASK_TYPE_REQUEST,
  taskType: taskType_id
});

export const DELETE_TASK_TYPE_SUCCESS = 'DELETE_TASK_TYPE_SUCCESS'
export const deleteTaskTypeSuccess = (taskType_id) => ({
  type: DELETE_TASK_TYPE_SUCCESS,
  taskType: taskType_id
});

export const DELETE_TASK_TYPE_FAIL = 'DELETE_TASK_TYPE_FAIL'
export const deleteTaskTypeFail = (error) => {
  if (error.response) {
    if (error.response.status === 400) {
      return {
        type: DELETE_TASK_TYPE_FAIL,
        errors: error.response.data
      }
    }
  } else {
    return {
      type: DELETE_TASK_TYPE_FAIL,
      errors: {'form': 'Unable to connect'}
    }
  }
}

export const deleteTaskType = (taskType_id) => ((dispatch) => {
  dispatch(deleteTaskTypeRequest(taskType_id))

  const client = getClient()

  return client.delete(
    '/tasktypes/' + taskType_id + '/',
  )
  .then( response => {
    dispatch(deleteTaskTypeSuccess(taskType_id))
  })
  .catch( error => dispatch(deleteTaskTypeFail(error)) )
});
