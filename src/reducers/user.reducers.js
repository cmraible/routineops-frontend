import {
  LOGOUT,
  LOGIN_SUCCESS,
} from '../actions/auth.actions';
import {
  SAVE_USER_SUCCESS,
} from '../actions/user.actions';

function userReducer(state = false, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.user
    case SAVE_USER_SUCCESS:
      return action.user
    case LOGOUT:
      return false
    default:
      return state
  }
}

export default userReducer;
