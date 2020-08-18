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
export const addTaskFail = (message) => {
  return {
    type: ADD_TASK_FAIL,
    message: message
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
    window.analytics.track('Added a task.', {name: task.name})

  })
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(addTaskFail('Unable to connect to server'))
    } else {
      return dispatch(addTaskFail('Something went wrong'));
    }
  } )
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
export const getTasksFail = (message) => {
  return {
    type: GET_TASKS_FAIL,
    message: message
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
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(getTasksFail('Unable to connect to server'))
    } else {
      return dispatch(getTasksFail('Something went wrong'));
    }
  } )
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
export const saveTaskFail = (message) => {
  return ({
    type: SAVE_TASK_FAIL,
    message: message
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
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(saveTaskFail('Unable to connect to server'))
    } else {
      return dispatch(saveTaskFail('Something went wrong'));
    }
  } )
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
export const deleteTaskFail = (message) => {
  return {
    type: DELETE_TASK_FAIL,
    message: message
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
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(deleteTaskFail('Unable to connect to server'))
    } else {
      return dispatch(deleteTaskFail('Something went wrong'));
    }
  } )
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
export const getTaskFail = (message) => {
  return {
    type: GET_TASK_FAIL,
    message: message
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
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(getTaskFail('Unable to connect to server'))
    } else {
      return dispatch(getTaskFail('Something went wrong'));
    }
  } )
});