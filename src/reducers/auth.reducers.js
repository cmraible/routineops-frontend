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
  RESET_SUCCESS,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_FAIL,
  VERIFY_EMAIL_SUCCESS
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
    case VERIFY_EMAIL_SUCCESS:
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

function signupFlow(state = false, action) {
  switch (action.type) {
    case VERIFY_EMAIL_SUCCESS:
      return Object.assign({}, {user: action.user})
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
    case VERIFY_EMAIL_SUCCESS:
      return action.token
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
    case VERIFY_EMAIL_REQUEST:
      return true
    case LOGIN_SUCCESS:
    case LOGIN_FAIL:
    case FORGOT_SUCCESS:
    case FORGOT_FAIL:
    case SIGNUP_SUCCESS:
    case SIGNUP_FAIL:
    case RESET_SUCCESS:
    case RESET_FAIL:
    case VERIFY_EMAIL_FAIL:
    case VERIFY_EMAIL_SUCCESS:
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
  signupFlow,
  token,
  isFetching
})


export default authReducer;
