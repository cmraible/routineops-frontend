import { combineReducers } from 'redux';
import {
  LOGOUT,
  LOGIN_SUCCESS
} from '../actions/auth.actions';
import {
  SAVE_ORG_SUCCESS,
  GET_ORG_SUCCESS,
  SAVE_ORG_REQUEST,
  SAVE_ORG_FAIL,
  GET_ORG_REQUEST,
  GET_ORG_FAIL
} from '../actions/organization.actions';

function organization(state = false, action) {
  switch (action.type) {
    case GET_ORG_SUCCESS:
      return action.org
    case SAVE_ORG_SUCCESS:
      return action.org
    case LOGOUT:
      return false
    case LOGIN_SUCCESS:
      return { id: action.user.organization }
    default:
      return state
  }
}

function isFetching(state = false, action) {
  switch (action.type) {
    case SAVE_ORG_REQUEST:
    case GET_ORG_REQUEST:
      return true
    case SAVE_ORG_SUCCESS:
    case SAVE_ORG_FAIL:
    case GET_ORG_SUCCESS:
    case GET_ORG_FAIL:
      return false
    default:
      return state
  }
}

const organizationReducer = combineReducers({
  organization, 
  isFetching
})

export default organizationReducer;
