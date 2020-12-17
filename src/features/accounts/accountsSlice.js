import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { getClient } from '../../apiClient';

// Adapter to normalize and sort response data
const accountsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.id > a.id
});

// Adapter creates default 'entities' and 'ids' entries. Add additional params to state here.
const initialState = accountsAdapter.getInitialState({});

export const fetchAccounts = createAsyncThunk('accounts/fetchAccounts', async (data, { getState }) => {
    const token = getState().auth.token
    const client = getClient(token);
    const response = await client.get('/accounts/');
    return response.data
});

export const fetchAccount = createAsyncThunk('accounts/fetchAccount', async (accountId, { getState }) => {
    const token = getState().auth.token
    const client = getClient(token);
    const response = await client.get(`/accounts/${accountId}/`);
    return response.data
});

export const addNewAccount = createAsyncThunk('accounts/addNewAccount', async (accountData, { getState }) => {
    const token = getState().auth.token
    const client = getClient(token);
    const response = await client.post('/accounts/', accountData)
    return response.data
});

export const updateAccount = createAsyncThunk('accounts/updateAccount', async (accountData, { getState }) => {
    const token = getState().auth.token
    const client = getClient(token);
    const response = await client.patch(`/accounts/${accountData.id}/`, accountData)
    window.analytics.group(accountData.id, {
        'name': accountData.name,
        'organization_id': accountData.id,
        'createdAt': accountData.created
    })
    return response.data
});

export const fetchAccountSetupIntent = createAsyncThunk('accounts/fetchAccountSetupIntent', async (id, { getState }) => {
    const token = getState().auth.token
    const client = getClient(token);
    const response = await client.get(`/accounts/${id}/create_setup_intent/`)
    return response.data
});

export const updateAccounntPaymentMethod = createAsyncThunk('accounts/updateAccountPaymentMethod', async (data, { getState }) => {
    const token = getState().auth.token
    const client = getClient(token);
    const response = await client.get(`/accounts/${data.accountId}/update_default_payment_method/`, {
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
        [fetchAccounts.fulfilled]: accountsAdapter.upsertMany,
        [fetchAccount.fulfilled]: accountsAdapter.upsertOne,
        [addNewAccount.fulfilled]: accountsAdapter.addOne,
        [updateAccount.fulfilled]: accountsAdapter.updateOne,
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

export const selectUserAccount = (state) => state.accounts.entities[state.users.entities[state.auth.userId].account];