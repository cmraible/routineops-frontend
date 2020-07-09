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
export const addCheckFail = (error) => {
  console.log(error);
  if (error.response) {
    if (error.response.status === 400) {
      return {
        type: ADD_CHECK_FAIL,
        errors: error.response.data
      }
    }
  } else {
    return {
      type: ADD_CHECK_FAIL,
      errors: {'form': 'Unable to connect'}
    }
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
  })
  .catch( error => dispatch(addCheckFail(error)) )
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
export const getChecksFail = (error) => {
  console.log(error)
  if (error.response) {
    if (error.response.status === 400) {
      return {
        type: GET_CHECKS_FAIL,
        errors: error.response.data
      }
    }
  } else {
    return {
      type: GET_CHECKS_FAIL,
      errors: {'form': 'Unable to connect'}
    }
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
  .catch( error => dispatch(getChecksFail(error)) )
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
export const saveCheckFail = (error) => {
  console.log(error)
  return ({
    type: SAVE_CHECK_FAIL,
    message: "An error occurred."
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
  .catch( error => dispatch(saveCheckFail(error)) )
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
export const deleteCheckFail = (error) => {
  if (error.response) {
    if (error.response.status === 400) {
      return {
        type: DELETE_CHECK_FAIL,
        errors: error.response.data
      }
    }
  } else {
    return {
      type: DELETE_CHECK_FAIL,
      errors: {'form': 'Unable to connect'}
    }
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
  .catch( error => dispatch(deleteCheckFail(error)) )
});
