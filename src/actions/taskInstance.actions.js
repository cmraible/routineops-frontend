import { normalize, schema } from 'normalizr';
import { getClient } from '../apiClient.js';


export const ADD_TASK_INSTANCE_REQUEST = 'ADD_TASK_INSTANCE_REQUEST'
export const addTaskInstanceRequest = (taskInstance) => ({
  type: ADD_TASK_INSTANCE_REQUEST,
  taskInstance: taskInstance
});


export const ADD_TASK_INSTANCE_SUCCESS = 'ADD_TASK_INSTANCE_SUCCESS'
export const addTaskInstanceSuccess = (taskInstance) => ({
  type: ADD_TASK_INSTANCE_SUCCESS,
  taskInstance: taskInstance
});

export const ADD_TASK_INSTANCE_FAIL = 'ADD_TASK_INSTANCE_FAIL'
export const addTaskInstanceFail = (error) => {
  if (error.response) {
    if (error.response.status === 400) {
      return {
        type: ADD_TASK_INSTANCE_FAIL,
        errors: error.response.data
      }
    }
  } else {
    return {
      type: ADD_TASK_INSTANCE_FAIL,
      errors: {'form': 'Unable to connect'}
    }
  }
}

export const addTaskInstance = (taskInstance) => ((dispatch) => {
  dispatch(addTaskInstanceRequest())

  const client = getClient()

  return client.post(
    '/taskinstances/', taskInstance
  )
  .then( response => {
    dispatch(addTaskInstanceSuccess(response.data))
  })
  .catch( error => dispatch(addTaskInstanceFail(error)) )
});

export const GET_TASK_INSTANCES_REQUEST = 'GET_TASK_INSTANCES_REQUEST'
export const getTaskInstancesRequest = (organization_id) => ({
  type: GET_TASK_INSTANCES_REQUEST,
  organization_id: organization_id
});

export const GET_TASK_INSTANCES_SUCCESS = 'GET_TASK_INSTANCES_SUCCESS'
export const getTaskInstancesSuccess = (taskInstances) => ({
  type: GET_TASK_INSTANCES_SUCCESS,
  taskInstances: taskInstances
});

export const GET_TASK_INSTANCES_FAIL = 'GET_TASK_INSTANCES_FAIL'
export const getTaskInstancesFail = (error) => {
  console.log(error)
  if (error.response) {
    if (error.response.status === 400) {
      return {
        type: GET_TASK_INSTANCES_FAIL,
        errors: error.response.data
      }
    }
  } else {
    return {
      type: GET_TASK_INSTANCES_FAIL,
      errors: {'form': 'Unable to connect'}
    }
  }
}

export const getTaskInstances = (organization_id) =>  ((dispatch) => {
  dispatch(getTaskInstancesRequest(organization_id))

  const client = getClient()

  return client.get(
    '/taskinstances/'
  )
  .then( response => {
    const taskInstance = new schema.Entity('taskInstances', {})
    const normalizedData = normalize(response.data, [taskInstance])
    dispatch(getTaskInstancesSuccess(normalizedData))
  })
  .catch( error => dispatch(getTaskInstancesFail(error)) )
});


export const SAVE_TASK_INSTANCE_REQUEST = 'SAVE_TASK_INSTANCE_REQUEST'
export const saveTaskInstanceRequest = (taskInstance) => ({
  type: SAVE_TASK_INSTANCE_REQUEST,
  taskInstance: taskInstance
});

export const SAVE_TASK_INSTANCE_SUCCESS = 'SAVE_TASK_INSTANCE_SUCCESS'
export const saveTaskInstanceSuccess = (taskInstance) => ({
  type: SAVE_TASK_INSTANCE_SUCCESS,
  taskInstance: taskInstance
});

export const SAVE_TASK_INSTANCE_FAIL = 'SAVE_TASK_INSTANCE_FAIL'
export const saveTaskInstanceFail = (error) => {
  console.log(error)
  return ({
    type: SAVE_TASK_INSTANCE_FAIL,
    message: "An error occurred."
  });
};

export const saveTaskInstance = (taskInstance) => ((dispatch) => {
  dispatch(saveTaskInstanceRequest())

  const client = getClient()

  return client.patch(
    '/taskinstances/' + taskInstance.id + '/', taskInstance
  )
  .then( response => {
    
    dispatch(saveTaskInstanceSuccess(response.data))
  })
  .catch( error => dispatch(saveTaskInstanceFail(error)) )
});


export const DELETE_TASK_INSTANCE_REQUEST = 'DELETE_TASK_INSTANCE_REQUEST'
export const deleteTaskInstanceRequest = (taskInstance_id) => ({
  type: DELETE_TASK_INSTANCE_REQUEST,
  taskInstance: taskInstance_id
});

export const DELETE_TASK_INSTANCE_SUCCESS = 'DELETE_TASK_INSTANCE_SUCCESS'
export const deleteTaskInstanceSuccess = (taskInstance_id) => ({
  type: DELETE_TASK_INSTANCE_SUCCESS,
  taskInstance: taskInstance_id
});

export const DELETE_TASK_INSTANCE_FAIL = 'DELETE_TASK_INSTANCE_FAIL'
export const deleteTaskInstanceFail = (error) => {
  if (error.response) {
    if (error.response.status === 400) {
      return {
        type: DELETE_TASK_INSTANCE_FAIL,
        errors: error.response.data
      }
    }
  } else {
    return {
      type: DELETE_TASK_INSTANCE_FAIL,
      errors: {'form': 'Unable to connect'}
    }
  }
}

export const deleteTaskInstance = (taskInstance_id) => ((dispatch) => {
  dispatch(deleteTaskInstanceRequest(taskInstance_id))

  const client = getClient()

  return client.delete(
    '/taskinstances/' + taskInstance_id + '/',
  )
  .then( response => {
    dispatch(deleteTaskInstanceSuccess(taskInstance_id))
  })
  .catch( error => dispatch(deleteTaskInstanceFail(error)) )
});
