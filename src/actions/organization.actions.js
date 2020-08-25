import { getClient } from '../apiClient.js';
import { goToOrgSubscription } from './ui.actions';

export const SAVE_ORG_REQUEST = 'SAVE_ORG_REQUEST'
export const saveOrgRequest = (org) => ({
  type: SAVE_ORG_REQUEST,
  org: org
});

export const SAVE_ORG_SUCCESS = 'SAVE_ORG_SUCCESS'
export const saveOrgSuccess = (org) => ({
  type: SAVE_ORG_SUCCESS,
  org: org
});

export const SAVE_ORG_FAIL = 'SAVE_ORG_FAIL'
export const saveOrgFail = (message) => ({
  type: SAVE_ORG_FAIL,
  message: message
});

export const saveOrg = (org) => ((dispatch) => {
  dispatch(saveOrgRequest())

  const client = getClient()

  return client.patch(
    '/organizations/' + org.id + '/', org
  )
  .then( response => {
    dispatch(saveOrgSuccess(response.data))
    window.analytics.group(org.id, {
      'name': org.name,
      'organization_id': org.id,
      'createdAt': org.created,
      'size': org.size
    })
  })
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(saveOrgFail('Unable to connect to server.'))
    } else {
      return dispatch(saveOrgFail('Something went wrong.'));
    }
  })
});

export const GET_ORG_REQUEST = 'GET_ORG_REQUEST'
export const getOrgRequest = (id) => ({
  type: GET_ORG_REQUEST,
  org: id
});


export const GET_ORG_SUCCESS = 'GET_ORG_SUCCESS'
export const getOrgSuccess = (org) => ({
  type: GET_ORG_SUCCESS,
  org: org
});

export const GET_ORG_FAIL = 'GET_ORG_FAIL'
export const getOrgFail = (message) => ({
  type: GET_ORG_FAIL,
  message: message
});

export const getOrg = (id) => ((dispatch) => {
  dispatch(getOrgRequest())

  const client = getClient()

  return client.get(
    '/organizations/' + id + '/'
  )
  .then( response => dispatch(getOrgSuccess(response.data)) )
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(getOrgFail('Unable to connect to server.'))
    } else {
      return dispatch(getOrgFail('Something went wrong.'));
    }
  } )
});

export const GET_ORG_SETUP_INTENT_REQUEST = 'GET_ORG_SETUP_INTENT_REQUEST'
export const getOrgSetupIntentRequest = () => ({
  type: GET_ORG_SETUP_INTENT_REQUEST
});


export const GET_ORG_SETUP_INTENT_SUCCESS = 'GET_ORG_SETUP_INTENT_SUCCESS'
export const getOrgSetupIntentSuccess = (intent) => ({
  type: GET_ORG_SETUP_INTENT_SUCCESS,
  intent: intent
});

export const GET_ORG_SETUP_INTENT_FAIL = 'GET_ORG_SETUP_INTENT_FAIL'
export const getOrgSetupIntentFail = (message) => ({
  type: GET_ORG_SETUP_INTENT_FAIL,
  message: message
});

export const getOrgSetupIntent = (id) => ((dispatch) => {
  dispatch(getOrgSetupIntentRequest())

  const client = getClient()

  return client.get(
    '/organizations/' + id + '/create_setup_intent/'
  )
  .then( response => dispatch(getOrgSetupIntentSuccess(response.data)) )
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(getOrgSetupIntentFail('Unable to connect to server.'))
    } else {
      return dispatch(getOrgSetupIntentFail('Something went wrong.'));
    }
  } )
});

export const UPDATE_ORG_PAYMENT_METHOD_REQUEST = 'UPDATE_ORG_PAYMENT_METHOD_REQUEST'
export const updateOrgPaymentMethodRequest = () => ({
  type: UPDATE_ORG_PAYMENT_METHOD_REQUEST
});


export const UPDATE_ORG_PAYMENT_METHOD_SUCCESS = 'UPDATE_ORG_PAYMENT_METHOD_SUCCESS'
export const updateOrgPaymentMethodSuccess = (org) => ({
  type: UPDATE_ORG_PAYMENT_METHOD_SUCCESS,
  org: org
});

export const UPDATE_ORG_PAYMENT_METHOD_FAIL = 'UPDATE_ORG_PAYMENT_METHOD_FAIL'
export const updateOrgPaymentMethodFail = (message) => ({
  type: UPDATE_ORG_PAYMENT_METHOD_FAIL,
  message: message
});

export const updateOrgPaymentMethod = (organization_id, newPaymentMethodId) => ((dispatch) => {
  dispatch(updateOrgPaymentMethodRequest())

  const client = getClient()

  return client.patch(
    '/organizations/' + organization_id + '/update_default_payment_method/', {
      'newPaymentMethodId': newPaymentMethodId
    }
  )
  .then( response => {
      dispatch(updateOrgPaymentMethodSuccess(response.data));
      dispatch(goToOrgSubscription());
      window.analytics.track('Changed payment method.');
  } )
  .catch( error => {
    if (!error.response) {
      // No response from server
      dispatch(updateOrgPaymentMethodFail('Unable to connect to server.'))
    } else {
      return dispatch(updateOrgPaymentMethodFail('Something went wrong.'));
    }
  } )
});
