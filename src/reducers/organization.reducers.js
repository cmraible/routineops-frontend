import {
  LOGOUT,
  LOGIN_SUCCESS
} from '../actions/auth.actions';
import {
  SAVE_ORG_SUCCESS,
  GET_ORG_SUCCESS,
} from '../actions/organization.actions';

function organizationReducer(state = false, action) {
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

export default organizationReducer;
