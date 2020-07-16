import { combineReducers } from 'redux';
import {
  LOGOUT,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  FORGOT_REQUEST,
  FORGOT_SUCCESS,
  FORGOT_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  RESET_REQUEST,
  RESET_FAIL,
  RESET_SUCCESS
} from '../actions/auth.actions';
import {
  GO_TO_LOGIN,
  GO_TO_SIGNUP
} from '../actions/ui.actions';


function isLoggedIn(state = false, action) {
  switch (action.type) {
    case LOGOUT:
      return false
    case LOGIN_SUCCESS:
      return true
    default:
      return state
  }
}

function loginError(state = false, action) {
  switch (action.type) {
    case LOGIN_FAIL:
      return action.message
    case LOGIN_SUCCESS:
    case LOGIN_REQUEST:
    case GO_TO_LOGIN:
      return false
    default:
      return state
  }
}

function signupErrors(state = false, action) {
  switch (action.type) {
    case SIGNUP_FAIL:
      return action.message
    case SIGNUP_SUCCESS:
      return false
    case SIGNUP_REQUEST:
      return false
    case GO_TO_SIGNUP:
      return false
    default:
      return state
  }
}

function signupSuccess(state = false, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return true
    default:
      return false
  }
}

function token(state = false, action) {
  switch (action.type) {
    case LOGOUT:
      return false
    case LOGIN_SUCCESS:
      return action.token
    default:
      return state
  }
}

function isFetching(state = false, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
    case FORGOT_REQUEST:
    case RESET_REQUEST:
      return true
    case LOGIN_SUCCESS:
    case LOGIN_FAIL:
    case FORGOT_SUCCESS:
    case FORGOT_FAIL:
    case SIGNUP_SUCCESS:
    case SIGNUP_FAIL:
    case RESET_SUCCESS:
    case RESET_FAIL:
      return false
    default:
      return state
  }
}

const authReducer = combineReducers({
  isLoggedIn,
  loginError,
  signupErrors,
  signupSuccess,
  token,
  isFetching
})


export default authReducer;
