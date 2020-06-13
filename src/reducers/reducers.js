import { combineReducers } from 'redux';
import {
  LOGOUT,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SAVE_USER_SUCCESS,
  GET_ORG_SUCCESS
} from '../actions/actions';
import {
  TOGGLE_DARK_MODE
} from '../actions/ui.actions';
import { connectRouter } from 'connected-react-router'


function darkMode(state = false, action) {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return !state
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
    default:
      return state
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
  organization,
  user,
  token
})

export default createRootReducer;
