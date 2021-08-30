import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import getClient from '../../apiClient';
import { logout } from '../auth/authSlice';

// Adapter to normalize and sort response data
const invitationsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.id > a.id,
    selectId: (entity) => entity.uuid
});

// Adapter creates default 'entities' and 'ids' entries. Add additional params to state here.
const initialState = invitationsAdapter.getInitialState({});

// Async thunks to interact with API
export const fetchInvitations = createAsyncThunk('invitations/fetchInvitations', async(data, {dispatch, getState}) => {
    const client = getClient(dispatch, getState);
    const response = await client.get('/invitations');
    return response.data;
});

export const fetchInvitation = createAsyncThunk('invitations/fetchInvitation', async (invitationId, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.get(`/invitations/${invitationId}/`);
    return response.data
});

export const addNewInvitation = createAsyncThunk('invitations/addNewInvitation', async (invitationData, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.post('/invitations/', invitationData)
        window.analytics.track('Created an invitation', { email: invitationData.email_address })
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }

});

export const deleteInvitation = createAsyncThunk('routines/deleteInvitation', async (invitationId, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.delete(`/invitations/${invitationId}/`)
        window.analytics.track('Deleted an invitation.')
        if (response.status === 204) {
            return invitationId
        }
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }

})

// Create slice
export const invitationsSlice = createSlice({
    name: 'invitation',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchInvitations.fulfilled]: invitationsAdapter.setAll,
        [fetchInvitation.fulfilled]: invitationsAdapter.upsertOne,
        [addNewInvitation.fulfilled]: invitationsAdapter.addOne,
        [deleteInvitation.fulfilled]: invitationsAdapter.removeOne,
        [logout.fulfilled]: invitationsAdapter.removeAll,
        [logout.rejected]: invitationsAdapter.removeAll
    }
});

// Export the invitation reducer
export default invitationsSlice.reducer

// Export selectors
export const {
    selectAll: selectAllInvitations,
    selectById: selectInvitationById,
    selectIds: selectInvitationIds,
    selectEntities: selectInvitationEntities
  } = invitationsAdapter.getSelectors(state => state.invitations)


export const selectIncompleteInvitations = (state) => state.invitations.ids.filter((invitationId) => {
    return state.invitations.entities[invitationId].completed == null;
}).map((invitationId) => {
    return state.invitations.entities[invitationId]
});