import {
  DELETE_CHECK_SUCCESS,
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

const checkReducer = combineReducers({
  byId,
  allIds
})

export default checkReducer;

export const getAllChecks = (state) =>
  state.allIds.map(id => state.byId[id]);
  