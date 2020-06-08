import { combineReducers } from 'redux';
import { TOGGLE_DARK_MODE, LOGOUT, LOGIN_SUCCESS } from './actions';


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
  token
})

export default rootReducer;
