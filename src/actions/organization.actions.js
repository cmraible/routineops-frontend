import { getClient } from '../apiClient.js';

export const SAVE_ORG_REQUEST = 'SAVE_ORG_REQUEST'
export const saveOrgRequest = (org) => ({
  type: SAVE_ORG_REQUEST,
  org: org
});

export const SAVE_ORG_SUCCESS = 'SAVE_ORG_SUCCESS'
export const saveOrgSuccess = (org) => ({
  type: SAVE_ORG_SUCCESS,
  org: org
});

export const SAVE_ORG_FAIL = 'SAVE_ORG_FAIL'
export const saveOrgFail = (message) => ({
  type: SAVE_ORG_FAIL,
  message: message
});

export const saveOrg = (org) => ((dispatch) => {
  dispatch(saveOrgRequest())

  const client = getClient()

  return client.patch(
    '/organizations/' + org.id + '/', org
  )
  .then( response => {
    dispatch(saveOrgSuccess(response.data))
  })
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(saveOrgFail('Unable to connect to server.'))
    } else {
      return dispatch(saveOrgFail('Something went wrong.'));
    }
  })
});

export const GET_ORG_REQUEST = 'GET_ORG_REQUEST'
export const getOrgRequest = (id) => ({
  type: GET_ORG_REQUEST,
  org: id
});


export const GET_ORG_SUCCESS = 'GET_ORG_SUCCESS'
export const getOrgSuccess = (org) => ({
  type: GET_ORG_SUCCESS,
  org: org
});

export const GET_ORG_FAIL = 'GET_ORG_FAIL'
export const getOrgFail = (message) => ({
  type: GET_ORG_FAIL,
  message: message
});

export const getOrg = (id) => ((dispatch) => {
  dispatch(getOrgRequest())

  const client = getClient()

  return client.get(
    '/organizations/' + id + '/'
  )
  .then( response => dispatch(getOrgSuccess(response.data)) )
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(getOrgFail('Unable to connect to server.'))
    } else {
      return dispatch(getOrgFail('Something went wrong.'));
    }
  } )
});
