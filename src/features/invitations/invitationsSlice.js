import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { getClient } from '../../apiClient';

// Adapter to normalize and sort response data
const invitationsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.id > a.id,
    selectId: (entity) => entity.uuid
});

// Adapter creates default 'entities' and 'ids' entries. Add additional params to state here.
const initialState = invitationsAdapter.getInitialState({});

// Async thunks to interact with API

export const fetchInvitation = createAsyncThunk('invitations/fetchInvitation', async (invitationId, { getState }) => {
    const token = getState().auth.token
    const client = getClient(token);
    const response = await client.get(`/invitations/${invitationId}/`);
    return response.data
});

export const addNewInvitation = createAsyncThunk('invitations/addNewInvitation', async (invitationData, { getState, rejectWithValue }) => {
    try {
        const token = getState().auth.token
        const client = getClient(token);
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

// Create slice
export const invitationsSlice = createSlice({
    name: 'invitation',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchInvitation.fulfilled]: invitationsAdapter.upsertOne,
        [addNewInvitation.fulfilled]: invitationsAdapter.addOne,
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