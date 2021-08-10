import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import getClient from '../../apiClient';
import { logout } from '../auth/authSlice';

// Adapter to normalize and sort response data
const layersAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.id > a.id
});

// Adapter creates default 'entities' and 'ids' entries. Add additional params to state here.
const initialState = layersAdapter.getInitialState({
    status: 'idle',
    error: null
});

// Async thunks to interact with API
export const fetchLayers = createAsyncThunk('layers/fetchLayers', async (data, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.get('/layers/');
    return response.data
});

export const fetchLayer = createAsyncThunk('layers/fetchLayer', async (layerId, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.get(`/layers/${layerId}`);
    return response.data
})

export const addNewLayer = createAsyncThunk('layers/addNewLayer', async (layerData, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.post('/layers/', layerData)
    window.analytics.track('Created a layer.')
    return response.data
})

export const updateLayer = createAsyncThunk('layers/updateLayer', async (layerData, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.patch(`/layers/${layerData.id}/`, layerData)
    return response.data
})

export const deleteLayer = createAsyncThunk('layers/deleteLayer', async (layerId, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.delete(`/layers/${layerId}/`)
    window.analytics.track('Deleted a layer.')
    return response.data
})

// Create slice
export const layersSlice = createSlice({
    name: 'layer',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchLayers.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            layersAdapter.upsertMany(state, action.payload)
        },
        [fetchLayer.fulfilled]: layersAdapter.upsertOne,
        [addNewLayer.fulfilled]: layersAdapter.addOne,
        [updateLayer.fulfilled]: layersAdapter.updateOne,
        [deleteLayer.fulfilled]: layersAdapter.removeOne,
        [logout.fulfilled]: layersAdapter.removeAll,
        [logout.rejected]: layersAdapter.removeAll
    }
});

// Export the Layer reducer
export default layersSlice.reducer

// Export selectors
export const {
    selectAll: selectAllLayers,
    selectById: selectLayerById,
    selectIds: selectLayerIds,
    selectEntities: selectLayerEntities
  } = layersAdapter.getSelectors(state => state.layers)

export const selectLayersForRoutine = (state, routineId) => {
    return selectAllLayers(state).filter((layer) => parseInt(layer.routine) === parseInt(routineId));
}

export const selectLayersForRole = (state, roleId) => {
    return selectAllLayers(state).filter((layer) => parseInt(layer.role) === parseInt(roleId));
}