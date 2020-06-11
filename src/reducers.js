import { combineReducers } from 'redux';
import { TOGGLE_DARK_MODE, LOGOUT, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from './actions';


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

function user(state = false, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
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

const rootReducer = combineReducers({
  darkMode,
  isLoggedIn,
  loginError,
  user,
  token
})

export default rootReducer;
