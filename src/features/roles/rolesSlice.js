import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import getClient from '../../apiClient';
import { logout } from '../auth/authSlice';

// Adapter to normalize and sort response data
const rolesAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.id > a.id
});

// Adapter creates default 'entities' and 'ids' entries. Add additional params to state here.
const initialState = rolesAdapter.getInitialState({});

// Async thunks to interact with API
export const fetchRoles = createAsyncThunk('roles/fetchRoles', async (data, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.get('/roles/');
    return response.data
});

export const fetchRole = createAsyncThunk('roles/fetchRole', async (roleId, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.get(`/roles/${roleId}/`);
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const addNewRole = createAsyncThunk('roles/addNewRole', async (roleData, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.post('/roles/', roleData)
        window.analytics.track('Added a role.')
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const updateRole = createAsyncThunk('roles/updateRole', async (roleData, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.patch(`/roles/${roleData.id}/`, roleData)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
});

export const deleteRole = createAsyncThunk('roles/deleteRole', async (roleId, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.delete(`/roles/${roleId}/`);
        window.analytics.track('Deleted a role.')
        if (response.status === 204) {
            return roleId
        }
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
});

// Create slice
export const rolesSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchRoles.fulfilled]: rolesAdapter.setAll,
        [fetchRole.fulfilled]: rolesAdapter.upsertOne,
        [addNewRole.fulfilled]: rolesAdapter.addOne,
        [updateRole.fulfilled]: (state, { payload }) => {
            const { id, ...changes} = payload
            rolesAdapter.updateOne(state, {id, changes});
        },
        [deleteRole.fulfilled]: rolesAdapter.removeOne,
        [logout.rejected]: rolesAdapter.removeAll,
        [logout.fulfilled]: rolesAdapter.removeAll
    }
});

// Export the role reducer
export default rolesSlice.reducer

// Export selectors
export const {
    selectAll: selectAllRoles,
    selectById: selectRoleById,
    selectIds: selectRoleIds,
    selectEntities: selectRoleEntities
  } = rolesAdapter.getSelectors(state => state.roles)