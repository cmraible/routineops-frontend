import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { getClient } from '../../apiClient';

// Adapter to normalize and sort response data
const taskInstancesAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.id > a.id
});

// Adapter creates default 'entities' and 'ids' entries. Add additional params to state here.
const initialState = taskInstancesAdapter.getInitialState({});

// Async thunks to interact with API
export const fetchTaskInstances = createAsyncThunk('taskInstances/fetchTaskInstances', async (data, { getState }) => {
    const token = getState().auth.token
    const client = getClient(token);
    const response = await client.get('/taskinstances/');
    return response.data
});

export const fetchTaskInstance = createAsyncThunk('taskInstances/fetchTaskInstance', async (taskInstanceId, { getState }) => {
    const token = getState().auth.token
    const client = getClient(token);
    const response = await client.get(`/taskinstances/${taskInstanceId}`);
    return response.data
});

export const addNewTaskInstance = createAsyncThunk('taskInstances/addNewTaskInstance', async (taskInstanceData, { getState }) => {
    const token = getState().auth.token
    const client = getClient(token);
    const response = await client.post('/taskinstances/', taskInstanceData)
    return response.data
});

export const updateTaskInstance = createAsyncThunk('taskInstances/updateTaskInstance', async (taskInstanceData, { getState }) => {
    const token = getState().auth.token
    const client = getClient(token);
    const response = await client.patch(`/taskinstances/${taskInstanceData.id}/`, taskInstanceData)
    return response.data
});

export const deleteTaskInstance = createAsyncThunk('taskInstances/deleteTaskInstance', async (taskInstanceId, { getState }) => {
    const token = getState().auth.token
    const client = getClient(token);
    const response = await client.delete(`/taskinstances/${taskInstanceId}/`)
    return response.data
});

export const completeTaskInstance = createAsyncThunk('taskInstances/completeTaskInstance', async (data, { getState }) => {
    const token = getState().auth.token
    const client = getClient(token);
    const taskInstance = data[0]
    const results = data[1]
    const response = await client.post(`/taskinstances/${taskInstance.id}/complete/`, results)
    window.analytics.track('Completed a task.');
    return response.data
});

// Create slice
export const taskInstancesSlice = createSlice({
    name: 'taskInstance',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchTaskInstances.fulfilled]: (state, action) => {
            taskInstancesAdapter.upsertMany(state, action.payload)
        },
        [fetchTaskInstance.fulfilled]: taskInstancesAdapter.upsertOne,
        [addNewTaskInstance.fulfilled]: taskInstancesAdapter.addOne,
        [updateTaskInstance.fulfilled]: taskInstancesAdapter.updateOne,
        [deleteTaskInstance.fulfilled]: taskInstancesAdapter.removeOne,
    }
});

// Export the taskInstance reducer
export default taskInstancesSlice.reducer

// Export selectors
export const {
    selectAll: selectAllTaskInstances,
    selectById: selectTaskInstanceById,
    selectIds: selectTaskInstanceIds,

  } = taskInstancesAdapter.getSelectors(state => state.taskInstances)