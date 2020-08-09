import { combineReducers } from 'redux';
import {
  GET_INVITATION_REQUEST,
  GET_INVITATION_FAIL,
  GET_INVITATION_SUCCESS
} from '../actions/invitation.actions';

function invitation(state = false, action) {
  switch (action.type) {
    case GET_INVITATION_SUCCESS:
      return action.invitation
    default:
      return state
  }
}

function isFetching(state = false, action) {
  switch (action.type) {
    case GET_INVITATION_REQUEST:
      return true
    case GET_INVITATION_SUCCESS:
    case GET_INVITATION_FAIL:
      return false
    default:
      return state
  }
}

function errors(state = false, action) {
  switch (action.type) {
    case GET_INVITATION_FAIL:
      return action.message
    case GET_INVITATION_SUCCESS:
    case GET_INVITATION_REQUEST:
      return false
    default:
      return state
  }
}


const invitationReducer = combineReducers({
  invitation,
  isFetching,
  errors
})

export default invitationReducer;
