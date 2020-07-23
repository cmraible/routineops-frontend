import { combineReducers } from 'redux';
import {
  LOGOUT
} from '../actions/auth.actions';
import {
  TOGGLE_DARK_MODE
} from '../actions/ui.actions';


function darkMode(state = false, action) {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return !state
    case LOGOUT:
      return false
    default:
      return state
  }
}


const uiReducer = combineReducers({
  darkMode
})

export default uiReducer;
