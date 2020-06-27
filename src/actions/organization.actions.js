import history from '../history.js';

const axios = require('axios').default;

// Get API host from env variable, then get api baseurl
const host = process.env.REACT_APP_API_HOST
const baseUrl = host + '/api'

// Create axios client with baseUrl and auth headers above
const config = {
  baseURL: baseUrl,
  timeout: 1000,
};

const getToken = () => {
  return window.localStorage.getItem('operationally-token')
}

const getAuthConfig = () => {
  return {
    headers: {'Authorization': 'Token ' + getToken() },
    ...config
  }
}

export const SAVE_ORG_REQUEST = 'SAVE_ORG_REQUEST'
export function saveOrgRequest(org) {
  return {
    type: SAVE_ORG_REQUEST,
    org: org
  }
}

export const SAVE_ORG_SUCCESS = 'SAVE_ORG_SUCCESS'
export function saveOrgSuccess(org) {
  return {
    type: SAVE_ORG_SUCCESS,
    org: org
  }
}

export const SAVE_ORG_FAIL = 'SAVE_ORG_FAIL'
export function saveOrgFail(error) {
  return {
    type: SAVE_ORG_FAIL,
    message: "An error occurred."
  }
}

export function saveOrg(org) {

  return function(dispatch) {
    dispatch(saveOrgRequest())

    const client = axios.create(getAuthConfig())

    return client.patch(
      '/organizations/' + org.id + '/', org
    )
    .then( response => {
      dispatch(saveOrgSuccess(response.data))
    })
    .catch( error => dispatch(saveOrgFail(error)) )
  }
}

export const GET_ORG_REQUEST = 'GET_ORG_REQUEST'
export function getOrgRequest(id) {
  return {
    type: GET_ORG_REQUEST,
    org: id
  }
}

export const GET_ORG_SUCCESS = 'GET_ORG_SUCCESS'
export function getOrgSuccess(org) {
  return {
    type: GET_ORG_SUCCESS,
    org: org
  }
}

export const GET_ORG_FAIL = 'GET_ORG_FAIL'
export function getOrgFail(error) {
  console.log(error)
  return {
    type: GET_ORG_FAIL,
    message: "An error occurred."
  }
}

export function getOrg(id) {

  return function(dispatch) {
    dispatch(getOrgRequest())

    const client = axios.create(getAuthConfig())

    return client.get(
      '/organizations/' + id + '/'
    )
    .then( response => dispatch(getOrgSuccess(response.data)) )
    .catch( error => dispatch(getOrgFail(error)) )
  }
}
