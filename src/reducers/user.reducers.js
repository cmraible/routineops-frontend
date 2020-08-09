import { combineReducers } from 'redux';
import {
  LOGOUT,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS
} from '../actions/auth.actions';
import {
  SAVE_USER_SUCCESS,
  SAVE_USER_FAIL,
  SAVE_USER_REQUEST
} from '../actions/user.actions';
import {
  GO_TO_PROFILE
} from '../actions/ui.actions';

function user(state = false, action) {
  console.log(action);
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.user.id
    case SIGNUP_SUCCESS:
      return action.result
    case LOGOUT:
      return false
    default:
      return state
  }
}

function isFetching(state = false, action) {
  switch (action.type) {
    case SAVE_USER_REQUEST:
      return true
    case SAVE_USER_SUCCESS:
    case SAVE_USER_FAIL:
      return false
    default:
      return state
  }
}

function errors(state = false, action) {
  switch (action.type) {
    case SAVE_USER_FAIL:
      return action.message
    case SAVE_USER_SUCCESS:
    case SAVE_USER_REQUEST:
    case GO_TO_PROFILE:
      return false
    default:
      return state
  }
}


const userReducer = combineReducers({
  user,
  isFetching,
  errors
})


export default userReducer;