

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { getClient } from '../../apiClient';


const socialAccountsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.id > a.id
});

const initialState = socialAccountsAdapter.getInitialState({})

export const fetchSocialAccounts = createAsyncThunk('socialAccounts/fetchSocialAccounts', async (id, { getState }) => {
    const token = getState().auth.token;
    const client = getClient(token);
    const response = await client.get('auth/socialaccounts/')
    return response.data
});

export const socialAccountsSlice = createSlice({
    name: 'socialaccounts',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchSocialAccounts.fulfilled]: socialAccountsAdapter.setAll
    }
});

export default socialAccountsSlice.reducer;

// Export selectors
export const {
    selectAll: selectAllSocialAccounts,
    selectById: selectSocialAccountById,
    selectIds: selectSocialAccountIds,
    selectEntities: selectSocialAccountEntities
  } = socialAccountsAdapter.getSelectors(state => state.socialaccounts)

