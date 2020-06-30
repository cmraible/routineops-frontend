import { normalize, schema } from 'normalizr';
import { getClient } from '../apiClient.js';


export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST'
export const addTaskRequest = (task) => ({
  type: ADD_TASK_REQUEST,
  task: task
});


export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS'
export const addTaskSuccess = (task) => ({
  type: ADD_TASK_SUCCESS,
  task: task
});

export const ADD_TASK_FAIL = 'ADD_TASK_FAIL'
export const addTaskFail = (error) => {
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

export const addTask = (task) => ((dispatch) => {
  dispatch(addTaskRequest())

  const client = getClient()

  return client.post(
    '/tasks/', task
  )
  .then( response => {
    dispatch(addTaskSuccess(response.data))
  })
  .catch( error => dispatch(addTaskFail(error)) )
});

export const GET_TASKS_REQUEST = 'GET_TASKS_REQUEST'
export const getTasksRequest = (organization_id) => ({
  type: GET_TASKS_REQUEST,
  organization_id: organization_id
});

export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS'
export const getTasksSuccess = (tasks) => ({
  type: GET_TASKS_SUCCESS,
  tasks: tasks
});

export const GET_TASKS_FAIL = 'GET_TASKS_FAIL'
export const getTasksFail = (error) => {
  console.log(error)
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

export const getTasks = (organization_id) =>  ((dispatch) => {
  dispatch(getTasksRequest(organization_id))

  const client = getClient()

  return client.get(
    '/tasks/'
  )
  .then( response => {
    const task = new schema.Entity('tasks', {})
    const normalizedData = normalize(response.data, [task])
    dispatch(getTasksSuccess(normalizedData))
  })
  .catch( error => dispatch(getTasksFail(error)) )
});

export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST'
export const deleteTaskRequest = (task_id) => ({
  type: DELETE_TASK_REQUEST,
  task: task_id
});

export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS'
export const deleteTaskSuccess = (task_id) => ({
  type: DELETE_TASK_SUCCESS,
  task: task_id
});

export const DELETE_TASK_FAIL = 'DELETE_TASK_FAIL'
export const deleteTaskFail = (error) => {
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

export const deleteTask = (task_id) => ((dispatch) => {
  dispatch(deleteTaskRequest(task_id))

  const client = getClient()

  return client.delete(
    '/tasks/' + task_id + '/',
  )
  .then( response => {
    dispatch(deleteTaskSuccess(task_id))
  })
  .catch( error => dispatch(deleteTaskFail(error)) )
});
