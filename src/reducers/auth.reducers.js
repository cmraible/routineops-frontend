import { combineReducers } from 'redux';
import {
  LOGOUT,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL
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
      return false
    case LOGIN_REQUEST:
      return false
    case GO_TO_LOGIN:
      return false
    default:
      return state
  }
}

function signupErrors(state = [], action) {
  switch (action.type) {
    case SIGNUP_FAIL:
      return action.errors
    case SIGNUP_SUCCESS:
      return []
    case SIGNUP_REQUEST:
      return []
    case GO_TO_SIGNUP:
      return []
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

const authReducer = combineReducers({
  isLoggedIn,
  loginError,
  signupErrors,
  signupSuccess,
  token
})


export default authReducer;
