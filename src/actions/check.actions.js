import { normalize, schema } from 'normalizr';
import { getClient } from '../apiClient.js';


export const ADD_CHECK_REQUEST = 'ADD_CHECK_REQUEST'
export const addCheckRequest = (check) => ({
  type: ADD_CHECK_REQUEST,
  check: check
});


export const ADD_CHECK_SUCCESS = 'ADD_CHECK_SUCCESS'
export const addCheckSuccess = (data) => ({
  type: ADD_CHECK_SUCCESS,
  entities: data.entities,
  result: data.result
});

export const ADD_CHECK_FAIL = 'ADD_CHECK_FAIL'
export const addCheckFail = (message) => {
  return {
    type: ADD_CHECK_FAIL,
    message: message
  }
}

export const addCheck = (check) => ((dispatch) => {
  dispatch(addCheckRequest())

  const client = getClient()

  return client.post(
    '/checks/', check
  )
  .then( response => {
    const check = new schema.Entity('checks', {})
    const normalizedData = normalize(response.data, check)
    dispatch(addCheckSuccess(normalizedData))
    window.analytics.track('Added a check.')
  })
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(addCheckFail('Unable to connect to server'))
    } else {
      return dispatch(addCheckFail('Something went wrong'));
    }
  })
});

export const GET_CHECKS_REQUEST = 'GET_CHECKS_REQUEST'
export const getChecksRequest = (organization_id) => ({
  type: GET_CHECKS_REQUEST,
  organization_id: organization_id
});

export const GET_CHECKS_SUCCESS = 'GET_CHECKS_SUCCESS'
export const getChecksSuccess = (checks) => ({
  type: GET_CHECKS_SUCCESS,
  checks: checks
});

export const GET_CHECKS_FAIL = 'GET_CHECKS_FAIL'
export const getChecksFail = (message) => {
  return {
    type: GET_CHECKS_FAIL,
    message: message
  }
}

export const getChecks = (organization_id) =>  ((dispatch) => {
  dispatch(getChecksRequest(organization_id))

  const client = getClient()

  return client.get(
    '/checks/'
  )
  .then( response => {
    const check = new schema.Entity('checks', {})
    const normalizedData = normalize(response.data, [check])
    dispatch(getChecksSuccess(normalizedData))
  })
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(getChecksFail('Unable to connect to server'))
    } else {
      return dispatch(getChecksFail('Something went wrong'));
    }
  })
});


export const SAVE_CHECK_REQUEST = 'SAVE_CHECK_REQUEST'
export const saveCheckRequest = (check) => ({
  type: SAVE_CHECK_REQUEST,
  check: check
});

export const SAVE_CHECK_SUCCESS = 'SAVE_CHECK_SUCCESS'
export const saveCheckSuccess = (data) => ({
  type: SAVE_CHECK_SUCCESS,
  entities: data.entities,
  result: data.result
});

export const SAVE_CHECK_FAIL = 'SAVE_CHECK_FAIL'
export const saveCheckFail = (message) => {
  return ({
    type: SAVE_CHECK_FAIL,
    message: message
  });
};

export const saveCheck = (check) => ((dispatch) => {
  dispatch(saveCheckRequest())

  const client = getClient()

  return client.patch(
    '/checks/' + check.id + '/', check
  )
  .then( response => {
    const check = new schema.Entity('checks', {})
    const normalizedData = normalize(response.data, check)
    dispatch(saveCheckSuccess(normalizedData))
  })
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(saveCheckFail('Unable to connect to server'))
    } else {
      return dispatch(saveCheckFail('Something went wrong'));
    }
  } )
});


export const DELETE_CHECK_REQUEST = 'DELETE_CHECK_REQUEST'
export const deleteCheckRequest = (check_id) => ({
  type: DELETE_CHECK_REQUEST,
  check: check_id
});

export const DELETE_CHECK_SUCCESS = 'DELETE_CHECK_SUCCESS'
export const deleteCheckSuccess = (check_id) => ({
  type: DELETE_CHECK_SUCCESS,
  check: check_id
});

export const DELETE_CHECK_FAIL = 'DELETE_CHECK_FAIL'
export const deleteCheckFail = (message) => {
  return {
    type: DELETE_CHECK_FAIL,
    message: message
  }
}

export const deleteCheck = (check_id) => ((dispatch) => {
  dispatch(deleteCheckRequest(check_id))

  const client = getClient()

  return client.delete(
    '/checks/' + check_id + '/',
  )
  .then( response => {
    dispatch(deleteCheckSuccess(check_id))
  })
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(deleteCheckFail('Unable to connect to server'))
    } else {
      return dispatch(deleteCheckFail('Something went wrong'));
    }
  } )
});
