import { normalize, schema } from 'normalizr';
import { getClient } from '../apiClient.js';


export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST'
export const addTaskRequest = (task) => ({
  type: ADD_TASK_REQUEST,
  task: task
});


export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS'
export const addTaskSuccess = (data) => ({
  type: ADD_TASK_SUCCESS,
  entities: data.entities,
  result: data.result
});

export const ADD_TASK_FAIL = 'ADD_TASK_FAIL'
export const addTaskFail = (error) => {
  console.log(error);
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
    const check = new schema.Entity('checks', {})
    const task = new schema.Entity('tasks', {
      checks: [check]
    })
    const normalizedData = normalize(response.data, task)
    console.log(normalizedData)
    dispatch(addTaskSuccess(normalizedData))
  })
  .catch( error => dispatch(addTaskFail(error)) )
});

export const GET_TASKS_REQUEST = 'GET_TASKS_REQUEST'
export const getTasksRequest = (organization_id) => ({
  type: GET_TASKS_REQUEST,
  organization_id: organization_id
});

export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS'
export const getTasksSuccess = (data) => ({
  type: GET_TASKS_SUCCESS,
  entities: data.entities,
  result: data.result
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
    const check = new schema.Entity('checks', {})
    const task = new schema.Entity('tasks', {
      checks: [check]
    })
    const normalizedData = normalize(response.data, [task])
    dispatch(getTasksSuccess(normalizedData))
  })
  .catch( error => dispatch(getTasksFail(error)) )
});


export const SAVE_TASK_REQUEST = 'SAVE_TASK_REQUEST'
export const saveTaskRequest = (task) => ({
  type: SAVE_TASK_REQUEST,
  task: task
});

export const SAVE_TASK_SUCCESS = 'SAVE_TASK_SUCCESS'
export const saveTaskSuccess = (data) => ({
  type: SAVE_TASK_SUCCESS,
  entities: data.entities,
  result: data.result
});

export const SAVE_TASK_FAIL = 'SAVE_TASK_FAIL'
export const saveTaskFail = (error) => {
  console.log(error)
  return ({
    type: SAVE_TASK_FAIL,
    message: "An error occurred."
  });
};

export const saveTask = (task) => ((dispatch) => {
  dispatch(saveTaskRequest())

  const client = getClient()

  return client.patch(
    '/tasks/' + task.id + '/', task
  )
  .then( response => {
    const check = new schema.Entity('checks', {})
    const task = new schema.Entity('tasks', {
      checks: [check]
    })
    const normalizedData = normalize(response.data, task)
    dispatch(saveTaskSuccess(normalizedData))
  })
  .catch( error => dispatch(saveTaskFail(error)) )
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


export const GET_TASK_REQUEST = 'GET_TASK_REQUEST'
export const getTaskRequest = (task_id) => ({
  type: GET_TASK_REQUEST,
  task_id: task_id
});

export const GET_TASK_SUCCESS = 'GET_TASK_SUCCESS'
export const getTaskSuccess = (data) => ({
  type: GET_TASK_SUCCESS,
  entities: data.entities,
  result: data.result
});

export const GET_TASK_FAIL = 'GET_TASK_FAIL'
export const getTaskFail = (error) => {
  console.log(error);
  if (error.response) {
    if (error.response.status === 400) {
      return {
        type: GET_TASK_FAIL,
        errors: error.response.data
      }
    }
  } else {
    return {
      type: GET_TASK_FAIL,
      errors: {'form': 'Unable to connect'}
    }
  }
}

export const getTask = (task_id) =>  ((dispatch) => {
  dispatch(getTaskRequest(task_id))

  const client = getClient()

  return client.get(
    '/tasks/' + task_id
  )
  .then( response => {
    const check = new schema.Entity('checks', {})
    const task = new schema.Entity('tasks', {
      checks: [check]
    })
    const normalizedData = normalize(response.data, task)
    dispatch(getTaskSuccess(normalizedData))
  })
  .catch( error => dispatch(getTaskFail(error)) )
});