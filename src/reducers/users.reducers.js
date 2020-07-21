import {
  GET_USERS_SUCCESS,
  GET_USERS_REQUEST,
  GET_USERS_FAIL
} from '../actions/user.actions';
import {
  LOGOUT
} from '../actions/auth.actions';
import { combineReducers } from 'redux';
import merge from 'lodash/merge';

function byId(state = {}, action) {
  switch (action.type) {
    case LOGOUT:
      return {}
    default:
      if (action.entities && action.entities.users) {
        return merge({}, state, action.entities.users)
      }
      return state
  }
}

function allIds(state = [], action) {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return action.result
    // case ADD_USER_SUCCESS:
    //   return [...state, action.result]
    case LOGOUT:
      return []
    default:
      return state
  }
}

const isFetching = (state = false, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return true
    case GET_USERS_SUCCESS:
    case GET_USERS_FAIL:
      return false
    default:
      return state
  }
}

const errors = (state = false, action) => {
  switch (action.type) {
    case GET_USERS_FAIL:
      return action.message
    case GET_USERS_SUCCESS:
    case GET_USERS_REQUEST:
      return false
    default:
      return state
  }
}

const usersReducer = combineReducers({
  byId,
  allIds,
  isFetching,
  errors
})

export default usersReducer;
  
export const getAllUsers = (state) => 
  state.allIds.map(id => state.byId[id]);