import { combineReducers } from 'redux';
import {
  LOGOUT,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SAVE_USER_SUCCESS,
  SAVE_ORG_SUCCESS,
  GET_ORG_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL
} from '../actions/actions';
import {
  TOGGLE_DARK_MODE,
  GO_TO_LOGIN,
  GO_TO_SIGNUP
} from '../actions/ui.actions';
import { connectRouter } from 'connected-react-router'


function darkMode(state = true, action) {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return !state
    case LOGOUT:
      return true
    default:
      return state
  }
}

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

function organization(state = false, action) {
  switch (action.type) {
    case GET_ORG_SUCCESS:
      return action.org
    case SAVE_ORG_SUCCESS:
      return action.org
    case LOGOUT:
      return false
    case LOGIN_SUCCESS:
      return { id: action.user.organization }
    default:
      return state
  }
}

function user(state = false, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.user
    case SAVE_USER_SUCCESS:
      return action.user
    case LOGOUT:
      return false
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

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  darkMode,
  isLoggedIn,
  loginError,
  signupSuccess,
  signupErrors,
  organization,
  user,
  token
})

export default createRootReducer;
