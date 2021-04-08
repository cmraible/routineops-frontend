import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import getClient from '../../apiClient';
import { logout } from '../auth/authSlice';

// Adapter to normalize and sort response data
const taskLayersAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.id > a.id
});

// Adapter creates default 'entities' and 'ids' entries. Add additional params to state here.
const initialState = taskLayersAdapter.getInitialState({
    status: 'idle',
    error: null
});

// Async thunks to interact with API
export const fetchTaskLayers = createAsyncThunk('taskLayers/fetchTaskLayers', async (data, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.get('/tasklayers/');
    return response.data
});

export const fetchTaskLayer = createAsyncThunk('taskLayers/fetchTaskLayer', async (taskLayerId, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.get(`/tasklayers/${taskLayerId}`);
    return response.data
})

export const addNewTaskLayer = createAsyncThunk('taskLayers/addNewTaskLayer', async (taskLayerData, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.post('/tasklayers/', taskLayerData)
    window.analytics.track('Created a task layer.')
    return response.data
})

export const updateTaskLayer = createAsyncThunk('taskLayers/updateTaskLayer', async (taskLayerData, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.patch(`/tasklayers/${taskLayerData.id}/`, taskLayerData)
    return response.data
})

export const deleteTaskLayer = createAsyncThunk('taskLayers/deleteTaskLayer', async (taskLayerId, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.delete(`/tasklayers/${taskLayerId}/`)
    window.analytics.track('Deleted a task layer.')
    return response.data
})

// Create slice
export const taskLayersSlice = createSlice({
    name: 'taskLayer',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchTaskLayers.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            taskLayersAdapter.upsertMany(state, action.payload)
        },
        [fetchTaskLayer.fulfilled]: taskLayersAdapter.upsertOne,
        [addNewTaskLayer.fulfilled]: taskLayersAdapter.addOne,
        [updateTaskLayer.fulfilled]: taskLayersAdapter.updateOne,
        [deleteTaskLayer.fulfilled]: taskLayersAdapter.removeOne,
        [logout.fulfilled]: taskLayersAdapter.removeAll,
        [logout.rejected]: taskLayersAdapter.removeAll
    }
});

// Export the taskLayer reducer
export default taskLayersSlice.reducer

// Export selectors
export const {
    selectAll: selectAllTaskLayers,
    selectById: selectTaskLayerById,
    selectIds: selectTaskLayerIds,
    selectEntities: selectTaskLayerEntities
  } = taskLayersAdapter.getSelectors(state => state.taskLayers)

export const selectTaskLayersForTask = (state, taskId) => {
    return selectAllTaskLayers(state).filter((layer) => parseInt(layer.task) === parseInt(taskId));
}