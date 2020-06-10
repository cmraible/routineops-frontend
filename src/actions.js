import React from 'react';
import { Redirect } from 'react-router';
import history from './history.js';
const axios = require('axios').default;



// Get API host from env variable, then get api baseurl
const host = process.env.REACT_APP_API_HOST
const baseUrl = host + '/api'


// Create axios client with baseUrl and auth headers above
const client = axios.create({
  baseURL: baseUrl,
  timeout: 1000
});


export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE'
export function toggleDarkMode() {
  return { type: TOGGLE_DARK_MODE }
}


export const LOGOUT = 'LOGOUT'
export function logout() {
  history.push('/')
  return { type: LOGOUT }
}


export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export function loginRequest() {
  return {
    type: LOGIN_REQUEST
  }
}


export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export function loginSuccess(token) {
  history.push('/')
  return {
      type: LOGIN_SUCCESS,
      token: token
  }
}


export function login(username, password) {

  return function(dispatch) {
    dispatch(loginRequest())

    return client.post(
      '/auth_token/', {
        username: username,
        password: password
      }
    )
    .then( response => response.data.token )
    .then( token => dispatch(loginSuccess(token)) )
  }
}
