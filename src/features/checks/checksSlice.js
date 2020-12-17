import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { getClient } from '../../apiClient';
import { fetchTasks } from '../tasks/tasksSlice';

// Adapter to normalize and sort response data
const checksAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.id > a.id
});

// Adapter creates default 'entities' and 'ids' entries. Add additional params to state here.
const initialState = checksAdapter.getInitialState({});

// Async thunks to interact with API
export const fetchChecks = createAsyncThunk('checks/fetchChecks', async (data, { getState }) => {
    const token = getState().auth.token
    const client = getClient(token);
    const response = await client.get('/checks/');
    return response.data
});

export const fetchCheck = createAsyncThunk('checks/fetchCheck', async (checkId, { getState }) => {
    const token = getState().auth.token
    const client = getClient(token);
    const response = await client.get(`/checks/${checkId}/`);
    return response.data
})

export const addNewCheck = createAsyncThunk('checks/addNewCheck', async (checkData, { getState }) => {
    const token = getState().auth.token
    const client = getClient(token);
    const response = await client.post('/checks/', checkData)
    window.analytics.track('Added a check.')
    return response.data
})

export const updateCheck = createAsyncThunk('checks/updateCheck', async (checkData, { getState }) => {
    const token = getState().auth.token
    const client = getClient(token);
    const response = await client.patch(`/checks/${checkData.id}/`, checkData)
    window.analytics.track('Updated a check.')
    return response.data
})

export const deleteCheck = createAsyncThunk('checks/deleteCheck', async (checkId, { getState }) => {
    const token = getState().auth.token
    const client = getClient(token);
    const response = await client.delete(`/checks/${checkId}/`)
    window.analytics.track('Deleted a check.')
    return response.data
})

// Create slice
export const checksSlice = createSlice({
    name: 'check',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchChecks.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            checksAdapter.upsertMany(state, action.payload)
        },
        [fetchTasks.fulfilled]: (state, action) => {
            const checks = action.payload.reduce((acc, cur) => {
                cur.checks.forEach(check => acc.push(check));
                return acc
            }, [])
            checksAdapter.upsertMany(state, checks)
        },
        [fetchCheck.fulfilled]: checksAdapter.upsertOne,
        [addNewCheck.fulfilled]: checksAdapter.addOne,
        [updateCheck.fulfilled]: checksAdapter.updateOne,
        [deleteCheck.fulfilled]: checksAdapter.removeOne,
    }
});

// Export the check reducer
export default checksSlice.reducer

// Export selectors
export const {
    selectAll: selectAllChecks,
    selectById: selectCheckById,
    selectIds: selectCheckIds
  } = checksAdapter.getSelectors(state => state.checks)

export const selectChecksForTask = (state, taskId) => {
    return selectAllChecks(state).filter(check => check.task === taskId)
}