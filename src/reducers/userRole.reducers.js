import {
  LOGOUT,
} from '../actions/auth.actions.js';
import {
  GET_USER_ROLES_SUCCESS,
  GET_USER_ROLES_REQUEST,
  ADD_USER_ROLE_SUCCESS,
  SAVE_USER_ROLE_SUCCESS,
  SAVE_USER_ROLE_REQUEST,
  ADD_USER_ROLE_FAIL,
  GET_USER_ROLES_FAIL,
  SAVE_USER_ROLE_FAIL,
  ADD_USER_ROLE_REQUEST,
  DELETE_USER_ROLE_REQUEST,
  DELETE_USER_ROLE_SUCCESS,
  DELETE_USER_ROLE_FAIL
} from '../actions/userRole.actions.js';
import { combineReducers } from 'redux';
import merge from 'lodash/merge'


const byId = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_ROLE_SUCCESS:
      const {[action.userRole]: omit, ...rest } = state;
      return rest
    case LOGOUT:
      return {}
    default:
      if (action.entities && action.entities.userroles) {
        return merge({}, state, action.entities.userroles)
      }
      return state
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case GET_USER_ROLES_SUCCESS:
      return action.result
    case ADD_USER_ROLE_SUCCESS:
      return [...state, action.result]
    case DELETE_USER_ROLE_SUCCESS:
      return state.filter(id => action.userRole !== id)
    case LOGOUT:
      return []
    default:
      return state
  }
}

const isFetching = (state = false, action) => {
  switch (action.type) {
    case ADD_USER_ROLE_REQUEST:
    case SAVE_USER_ROLE_REQUEST:
    case GET_USER_ROLES_REQUEST:
    case DELETE_USER_ROLE_REQUEST:
      return true
    case ADD_USER_ROLE_SUCCESS:
    case ADD_USER_ROLE_FAIL:
    case SAVE_USER_ROLE_SUCCESS:
    case SAVE_USER_ROLE_FAIL:
    case GET_USER_ROLES_SUCCESS:
    case GET_USER_ROLES_FAIL:
    case DELETE_USER_ROLE_SUCCESS:
    case DELETE_USER_ROLE_FAIL:
      return false
    default:
      return state
  }
}

const errors = (state = false, action) => {
  switch (action.type) {
    case SAVE_USER_ROLE_FAIL:
    case ADD_USER_ROLE_FAIL:
    case GET_USER_ROLES_FAIL:
    case DELETE_USER_ROLE_FAIL:
      return action.message
    case SAVE_USER_ROLE_SUCCESS:
    case SAVE_USER_ROLE_REQUEST:
    case ADD_USER_ROLE_SUCCESS:
    case ADD_USER_ROLE_REQUEST:
    case GET_USER_ROLES_SUCCESS:
    case GET_USER_ROLES_REQUEST:
    case DELETE_USER_ROLE_SUCCESS:
    case DELETE_USER_ROLE_REQUEST:
      return false
    default:
      return state
  }
}

const userRoleReducer = combineReducers({
  byId,
  allIds,
  isFetching,
  errors
})

export default userRoleReducer;

export const getAllUserRoles = (state) => 
  state.allIds.map(id => state.byId[id]);

export const getUserActiveRoles = (state, user) =>
  state.allIds.map(id => state.byId[id]).filter((userRole) => userRole.user === user.id && userRole.is_active);
