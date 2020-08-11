import { getClient } from '../apiClient';
import { saveOrgSuccess } from './organization.actions';

export const ADD_SUBSCRIPTION_REQUEST = 'ADD_SUBSCRIPTION_REQUEST'
export const addSubscriptionRequest = () => ({
  type: ADD_SUBSCRIPTION_REQUEST
});

export const ADD_SUBSCRIPTION_SUCCESS = 'ADD_SUBSCRIPTION_SUCCESS'
export const addSubscriptionSuccess = (organization) => ({
  type: ADD_SUBSCRIPTION_SUCCESS,
  org: organization
});

export const ADD_SUBSCRIPTION_FAIL = 'ADD_SUBSCRIPTION_FAIL'
export const addSubscriptionFail = (message) => {
  return {
    type: ADD_SUBSCRIPTION_FAIL,
    message: message
  }
}

export const addSubscription = (subscription) => ((dispatch) => {
    dispatch(addSubscriptionRequest());

    const client = getClient();

    return client.post(
        `/organizations/${subscription.organization}/create_subscription/`, subscription
    )
    .then( response => {
        dispatch(addSubscriptionSuccess(response.data));
    })
    .catch( error => {
        dispatch(addSubscriptionFail(error));
    });
});

export const GET_SUBSCRIPTION_REQUEST = 'GET_SUBSCRIPTION_REQUEST'
export const getSubscriptionRequest = () => ({
  type: GET_SUBSCRIPTION_REQUEST
});

export const GET_SUBSCRIPTION_SUCCESS = 'GET_SUBSCRIPTION_SUCCESS'
export const getSubscriptionSuccess = (data) => ({
  type: GET_SUBSCRIPTION_SUCCESS,
  entities: data.entities,
  result: data.result
});

export const GET_SUBSCRIPTION_FAIL = 'GET_SUBSCRIPTION_FAIL'
export const getSubscriptionFail = (message) => {
  return {
    type: GET_SUBSCRIPTION_FAIL,
    message: message
  }
}

export const getSubscription = (organization_id) => ((dispatch) => {
    dispatch(getSubscriptionRequest());

    const client = getClient();

    return client.get(
        `/organizations/${organization_id}/subscription`,
    )
    .then( response => {
        dispatch(getSubscriptionSuccess(response.data));
    })
    .catch( error => {
        dispatch(getSubscriptionFail(error));
    });
});

export const CANCEL_SUBSCRIPTION_REQUEST = 'CANCEL_SUBSCRIPTION_REQUEST'
export const cancelSubscriptionRequest = () => ({
  type: CANCEL_SUBSCRIPTION_REQUEST
});

export const CANCEL_SUBSCRIPTION_SUCCESS = 'CANCEL_SUBSCRIPTION_SUCCESS'
export const cancelSubscriptionSuccess = (data) => ({
  type: CANCEL_SUBSCRIPTION_SUCCESS,
  org: data
});

export const CANCEL_SUBSCRIPTION_FAIL = 'CANCEL_SUBSCRIPTION_FAIL'
export const cancelSubscriptionFail = (message) => {
  return {
    type: CANCEL_SUBSCRIPTION_FAIL,
    message: message
  }
}

export const cancelSubscription = (organization_id) => ((dispatch) => {
    dispatch(cancelSubscriptionRequest());

    const client = getClient();

    return client.delete(
        '/organizations/' + organization_id + "/cancel_subscription/"
    )
    .then( response => {
        dispatch(cancelSubscriptionSuccess(response.data));
    })
    .catch( error => {
        dispatch(cancelSubscriptionFail(error));
    });
});