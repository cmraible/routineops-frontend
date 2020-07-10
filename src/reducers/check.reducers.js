import {
  ADD_CHECK_REQUEST,
  DELETE_CHECK_SUCCESS, 
  GET_CHECKS_SUCCESS,
  GET_CHECKS_REQUEST,
  SAVE_CHECK_REQUEST,
  DELETE_CHECK_REQUEST,
  ADD_CHECK_SUCCESS,
  ADD_CHECK_FAIL,
  GET_CHECKS_FAIL,
  SAVE_CHECK_SUCCESS,
  SAVE_CHECK_FAIL,
  DELETE_CHECK_FAIL
} from '../actions/check.actions';
import {
  LOGOUT
} from '../actions/auth.actions';
import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import uniq from 'lodash/uniq';


function byId(state = {}, action) {
  switch (action.type) {
    case DELETE_CHECK_SUCCESS:
      const {[action.check]: omit, ...rest} = state;
      return rest
    case LOGOUT:
      return {}
    default:
      if (action.entities && action.entities.checks) {
        return merge({}, state, action.entities.checks)
      }
      return state
  }
}

function allIds(state = [], action) {
  switch (action.type) {

    case DELETE_CHECK_SUCCESS:
      return state.filter(id => action.check !== id)
    case LOGOUT:
      return []
    default:
      if (action.entities && action.entities.checks) {
        const ids = Object.keys(action.entities.checks)
        const check_ids = ids.map((key) => action.entities.checks[key].id)
        return uniq([...state, ...check_ids])
      }
      return state
  }
}

function isFetching(state = false, action) {
  switch (action.type) {
    case ADD_CHECK_REQUEST:
    case GET_CHECKS_REQUEST:
    case SAVE_CHECK_REQUEST:
    case DELETE_CHECK_REQUEST:
      return true
    case ADD_CHECK_SUCCESS:
    case ADD_CHECK_FAIL:
    case GET_CHECKS_SUCCESS:
    case GET_CHECKS_FAIL:
    case SAVE_CHECK_SUCCESS:
    case SAVE_CHECK_FAIL:
    case DELETE_CHECK_FAIL:
    case DELETE_CHECK_SUCCESS:
      return false
    default:
      return state
  }
}

const checkReducer = combineReducers({
  byId,
  allIds,
  isFetching
})

export default checkReducer;

export const getAllChecks = (state) =>
  state.allIds.map(id => state.byId[id]);
  