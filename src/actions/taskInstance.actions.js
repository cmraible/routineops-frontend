import { normalize, schema } from 'normalizr';
import { getClient } from '../apiClient.js';

export const GET_TASK_INSTANCES_REQUEST = 'GET_TASK_INSTANCES_REQUEST'
export const getTaskInstancesRequest = (organization_id) => ({
  type: GET_TASK_INSTANCES_REQUEST,
  organization_id: organization_id
});

export const GET_TASK_INSTANCES_SUCCESS = 'GET_TASK_INSTANCES_SUCCESS'
export const getTaskInstancesSuccess = (data) => ({
  type: GET_TASK_INSTANCES_SUCCESS,
  entities: data.entities,
  result: data.result
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
export const saveTaskInstanceSuccess = (data) => ({
  type: SAVE_TASK_INSTANCE_SUCCESS,
  entities: data.entities,
  result: data.result
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
    const taskInstance = new schema.Entity('taskInstances')
    const normalizedData = normalize(response.data, taskInstance)
    dispatch(saveTaskInstanceSuccess(normalizedData))
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

export const COMPLETE_TASK_INSTANCE_REQUEST = 'COMPLETE_TASK_INSTANCE_REQUEST'
export const completeTaskInstanceRequest = (taskInstance, results) => ({
  type: COMPLETE_TASK_INSTANCE_REQUEST,
  taskInstance: taskInstance,
  results: results
});


export const COMPLETE_TASK_INSTANCE_SUCCESS = 'COMPLETE_TASK_INSTANCE_SUCCESS'
export const completeTaskInstanceSuccess = (data) => ({
  type: COMPLETE_TASK_INSTANCE_SUCCESS,
  entities: data.entities,
  result: data.result
});

export const COMPLETE_TASK_INSTANCE_FAIL = 'COMPLETE_TASK_INSTANCE_FAIL'
export const completeTaskInstanceFail = (error) => {
  if (error.response) {
    if (error.response.status === 400) {
      return {
        type: COMPLETE_TASK_INSTANCE_FAIL,
        errors: error.response.data
      }
    }
  } else {
    return {
      type: COMPLETE_TASK_INSTANCE_FAIL,
      errors: {'form': 'Unable to connect'}
    }
  }
}

export const completeTaskInstance = (taskInstance, results) => ((dispatch) => {
  dispatch(completeTaskInstanceRequest(taskInstance, results))

  const client = getClient()

  return client.post(
    '/taskinstances/' + taskInstance.id + '/complete/', results
  )
  .then( response => {
    const taskInstance = new schema.Entity('taskInstances')
    const normalizedData = normalize(response.data, taskInstance)
    dispatch(completeTaskInstanceSuccess(normalizedData))
  })
  .catch( error => dispatch(completeTaskInstanceFail(error)) )
});