import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import getClient from '../../apiClient';
import { addNewSubscription, updateSubscription, cancelSubscription } from '../subscriptions/subscriptionsSlice';
import { logout, selectIsLoggedIn, selectLoggedInUser } from '../auth/authSlice';


// Adapter to normalize and sort response data
const accountsAdapter = createEntityAdapter({});

// Adapter creates default 'entities' and 'ids' entries. Add additional params to state here.
const initialState = accountsAdapter.getInitialState({});

export const fetchAccount = createAsyncThunk('accounts/fetchAccount', async (accountId, {dispatch, getState}) => {
    const client = getClient(dispatch, getState);
    const response = await client.get(`/accounts/${accountId}/`);
    return response.data
});

export const updateAccount = createAsyncThunk('accounts/updateAccount', async (accountData, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.patch(`/accounts/${accountData.id}/`, accountData)
        window.analytics.group(accountData.id, {
            'name': accountData.name,
            'organization_id': accountData.id,
            'createdAt': accountData.created
        })
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }

});

export const fetchAccountSetupIntent = createAsyncThunk('accounts/fetchAccountSetupIntent', async (id, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.get(`/accounts/${id}/create_setup_intent/`)
    return response.data
});

export const updateAccountPaymentMethod = createAsyncThunk('accounts/updateAccountPaymentMethod', async (data, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.patch(`/accounts/${data.accountId}/update_default_payment_method/`, {
        newPaymentMethodId: data.newPaymentMethodId
    })
    window.analytics.track('Changed payment method.')
    return response.data
});


// Create slice
export const accountsSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAccount.fulfilled]: accountsAdapter.upsertOne,
        [cancelSubscription.fulfilled]: accountsAdapter.upsertOne,
        [updateSubscription.fulfilled]: accountsAdapter.upsertOne,
        [addNewSubscription.fulfilled]: accountsAdapter.upsertOne,
        [updateAccount.fulfilled]: (state, { payload }) => {
            const { id, ...changes } = payload
            accountsAdapter.updateOne(state, { id, changes });
        },
        [updateAccountPaymentMethod.fulfilled]: (state, { payload }) => {
            const { id, ...changes } = payload
            accountsAdapter.updateOne(state, { id, changes });
        },
        [logout.fulfilled]: accountsAdapter.removeAll,
        [logout.rejected]: accountsAdapter.removeAll
    }
});

// Export the account reducer
export default accountsSlice.reducer;

// Export selectors
export const {
    selectAll: selectAllAccounts,
    selectById: selectAccountById,
    selectIds: selectAccountIds,
    selectEntities: selectAccountEntities,
  } = accountsAdapter.getSelectors(state => state.accounts);

export const selectUserAccount = (state) => {
    const user = selectLoggedInUser(state)
    if (selectIsLoggedIn(state)) {
        return state.accounts.entities[user.account]
    } else {
        return null;
    }
};