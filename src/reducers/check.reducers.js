import {
  GET_CHECKS_SUCCESS,
  ADD_CHECK_SUCCESS,
  DELETE_CHECK_SUCCESS,
  SAVE_CHECK_SUCCESS
} from '../actions/check.actions';
import {
  LOGOUT
} from '../actions/auth.actions';
import { combineReducers } from 'redux';


const check = (state, action) => {
  switch (action.type) {
    case ADD_CHECK_SUCCESS:
    case SAVE_CHECK_SUCCESS:
      return action.check
    default:
      return state
  }
}

function byId(state = {}, action) {
  switch (action.type) {
    case GET_CHECKS_SUCCESS:
      if ('checks' in action.checks.entities) {
        return action.checks.entities.checks
      } else {
        return {}
      }
    case ADD_CHECK_SUCCESS:
    case SAVE_CHECK_SUCCESS:
      return {
        ...state,
        [action.check.id]: check(undefined, action)
      }
    
    case DELETE_CHECK_SUCCESS:
      const {[action.check]: omit, ...rest} = state;
      return rest
    case LOGOUT:
      return {}
    default:
      return state
  }
}

function allIds(state = [], action) {
  switch (action.type) {
    case GET_CHECKS_SUCCESS:
      return action.checks.result
    case ADD_CHECK_SUCCESS:
      return [...state, action.check.id]
    case DELETE_CHECK_SUCCESS:
      return state.filter(id => action.check !== id)
    case LOGOUT:
      return []
    default:
      return state
  }
}

const checkReducer = combineReducers({
  byId,
  allIds
})

export default checkReducer;

export const getAllChecks = (state) =>
  state.allIds.map(id => state.byId[id]);
  