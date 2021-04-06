

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import getClient from '../../apiClient';
import { logout } from '../auth/authSlice';


const socialAccountsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.id > a.id
});

const initialState = socialAccountsAdapter.getInitialState({})

export const fetchSocialAccounts = createAsyncThunk('socialAccounts/fetchSocialAccounts', async (id, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.get('auth/socialaccounts/')
    return response.data
});

export const socialAccountsSlice = createSlice({
    name: 'socialaccounts',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchSocialAccounts.fulfilled]: socialAccountsAdapter.setAll,
        [logout.fulfilled]: socialAccountsAdapter.removeAll,
        [logout.rejected]: socialAccountsAdapter.removeAll
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

