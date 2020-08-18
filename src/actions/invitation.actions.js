import { schema, normalize } from 'normalizr';
import { getClient } from '../apiClient.js';




export const ADD_INVITATION_REQUEST = 'ADD_INVITATION_REQUEST'
export const addInvitationRequest = (data) => ({
  type: ADD_INVITATION_REQUEST,
  invitation: data
});

export const ADD_INVITATION_SUCCESS = 'ADD_INVITATION_SUCCESS'
export const addInvitationSuccess = (data) => ({
  type: ADD_INVITATION_SUCCESS,
  entities: data.entities,
  result: data.result
});

export const ADD_INVITATION_FAIL = 'ADD_INVITAITON_FAIL'
export const addInvitationFail = (message) => {
  return {
    type: ADD_INVITATION_FAIL,
    message: message
  }
}

export const addInvitation = (data) => ((dispatch) => {
  dispatch(addInvitationRequest(data));

  const client = getClient(); 

  return client.post(
    '/invitations/', data
  )
  .then( response => {
    const invitation = new schema.Entity('invitations', {})
    const normalizedData = normalize(response.data, invitation)
    dispatch(addInvitationSuccess(normalizedData))
    window.analytics.track('Created an invitation.', { email: data.email_address })
  })
  .catch( error => {
    if (!error.response) {
      dispatch(addInvitationFail('Unable to connect to the server'))
    } else {
      return dispatch(addInvitationFail('Something went wrong.'))
    }
  })
});


export const GET_INVITATION_REQUEST = 'GET_INVITATION_REQUEST'
export const getInvitationRequest = () => ({
  type: GET_INVITATION_REQUEST
});

export const GET_INVITATION_SUCCESS = 'GET_INVITATION_SUCCESS'
export const getInvitationSuccess = (data) => ({
  type: GET_INVITATION_SUCCESS,
  invitation: data
});

export const GET_INVITATION_FAIL = 'GET_INVITATION_FAIL'
export const getInvitationFail = (message) => {
  return {
    type: GET_INVITATION_FAIL,
    message: message
  }
}

export const getInvitation = (invite_uuid) =>  ((dispatch) => {
  dispatch(getInvitationRequest())

  const client = getClient()

  return client.get(
    '/invitations/' + invite_uuid
  )
  .then( response => {
    dispatch(getInvitationSuccess(response.data))
  })
  .catch( error => {
    console.log(error)
    if (!error.response) {
      // No response from server
      dispatch(getInvitationFail('Unable to connect to server'))
    } else {
      return dispatch(getInvitationFail('Something went wrong'));
    }
  } )
});
