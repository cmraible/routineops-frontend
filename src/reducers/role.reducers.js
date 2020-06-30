import {
  LOGOUT,
} from '../actions/auth.actions.js';
import {
  GET_ROLES_SUCCESS,
  ADD_ROLE_SUCCESS,
  DELETE_ROLE_SUCCESS
} from '../actions/role.actions.js';
import { combineReducers } from 'redux';

const role = (state, action) => {
  switch (action.type) {
    case ADD_ROLE_SUCCESS:
      return action.role
    default:
      return state
  }
}

const byId = (state = {}, action) => {
  switch (action.type) {
    case GET_ROLES_SUCCESS:
      if ('roles' in action.roles.entities) {
        return action.roles.entities.roles
      } else {
        return {}
      }
    case ADD_ROLE_SUCCESS:
      return {
        ...state,
        [action.role.id]: role(undefined, action)
      }
    case DELETE_ROLE_SUCCESS:
      const {[action.role]: omit, ...rest } = state;
      return rest
    case LOGOUT:
      return {}
    default:
      return state
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case GET_ROLES_SUCCESS:
      return action.roles.result
    case ADD_ROLE_SUCCESS:
      return [...state, action.role.id]
    case DELETE_ROLE_SUCCESS:
      return state.filter(id => action.role !== id)
    case LOGOUT:
      return []
    default:
      return state
  }
}

const roleReducer = combineReducers({
  byId,
  allIds
})

export default roleReducer;

export const getAllRoles = (state) => 
  state.allIds.map(id => state.byId[id]);
