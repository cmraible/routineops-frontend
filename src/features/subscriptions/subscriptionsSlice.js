import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import getClient from '../../apiClient';
import { logout } from '../auth/authSlice';

// Adapter to normalize and sort response data
const subscriptionsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.id > a.id
});

// Adapter creates default 'entities' and 'ids' entries. Add additional params to state here.
const initialState = subscriptionsAdapter.getInitialState({});

// Async thunks to interact with API
export const addNewSubscription = createAsyncThunk('subscriptions/addNewSubscription', async (subscription, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.post(
            `/accounts/${subscription.account}/create_subscription/`,
            subscription
        );
        window.analytics.track('Started a subscription.');
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
});

export const updateSubscription = createAsyncThunk('subscriptions/updateSubscription', async (subscription, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.patch(
            `/accounts/${subscription.account}/update_subscription/`, subscription
        );
        window.analytics.track('Updated subscription.')
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }

});

export const getUpcomingInvoice = createAsyncThunk('subscriptions/getUpcomingInvoice', async (subscription, { dispatch, getState }) => {
        const client = getClient(dispatch, getState);
        const response = await client.post(
        `/accounts/${subscription.account}/upcoming_invoice/`, subscription
    )
    return response.data
});

export const previewUpcomingInvoice = createAsyncThunk('subscriptions/previewUpcomingInvoice', async (data, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.post(
        `/accounts/${data.account}/upcoming_invoice/`, data
    )
    return response.data
});

export const getSubscription = createAsyncThunk('subscriptions/getSubscription', async (accountId, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.get(
        `/accounts/${accountId}/subscription`
    )
    return response.data
})

export const cancelSubscription = createAsyncThunk('subscriptions/cancelSubscription', async (accountId, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.delete(
        `/accounts/${accountId}/cancel_subscription`
    )
    window.analytics.track('Canceled subscription.')
    return response.data
})

// Create slice
export const subscriptionsSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {},
    extraReducers: {
        [addNewSubscription.fulfilled]: subscriptionsAdapter.addOne,
        [updateSubscription.fulfilled]: subscriptionsAdapter.upsertOne,
        [logout.fulfilled]: subscriptionsAdapter.removeAll,
        [logout.rejected]: subscriptionsAdapter.removeAll
    }
});

// Export the subscription reducer
export default subscriptionsSlice.reducer

// Export selectors
export const {
    selectAll: selectAllSubscriptions,
    selectById: selectSubscriptionById,
    selectIds: selectSubscriptionIds,
    selectEntities: selectSubscriptionEntities
  } = subscriptionsAdapter.getSelectors(state => state.subscriptions)