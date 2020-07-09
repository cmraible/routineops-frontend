import {
  LOGOUT,
} from '../actions/auth.actions.js';
import {
  GET_ROLES_SUCCESS,
  ADD_ROLE_SUCCESS,
  SAVE_ROLE_SUCCESS,
  DELETE_ROLE_SUCCESS
} from '../actions/role.actions.js';
import { combineReducers } from 'redux';
import merge from 'lodash/merge'


const byId = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ROLE_SUCCESS:
      const {[action.role]: omit, ...rest } = state;
      return rest
    case LOGOUT:
      return {}
    default:
      if (action.entities && action.entities.roles) {
        return merge({}, state, action.entities.roles)
      }
      return state
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case GET_ROLES_SUCCESS:
      return action.result
    case ADD_ROLE_SUCCESS:
      return [...state, action.result]
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
  state.allIds.map(id => state.byId[id]).sort((a, b) => {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    else return 0
  });
