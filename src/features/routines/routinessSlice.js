import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import getClient from '../../apiClient';
import { logout } from '../auth/authSlice';

// Adapter to normalize and sort response data
const routinesAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.id > a.id
});

// Adapter creates default 'entities' and 'ids' entries. Add additional params to state here.
const initialState = routinesAdapter.getInitialState({});

// Async thunks to interact with API
export const fetchRoutines = createAsyncThunk('routines/fetchRoutines', async (data, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.get('/tasks/');
    return response.data
});

export const fetchRoutine = createAsyncThunk('routines/fetchroutine', async (routineId, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.get(`/tasks/${routineId}`);
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
});

export const addNewRoutine = createAsyncThunk('routines/addNewRoutine', async (routineData, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.post('/tasks/', routineData)
        console.log(response)
        window.analytics.track('Added a routine.')
        return response.data
    } catch (err) {
        console.log(err)
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const updateRoutine = createAsyncThunk('routines/updateRoutine', async (routineData, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.patch(`/tasks/${routineData.id}/`, routineData)
        window.analytics.track('Updated a routine.')
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const deleteRoutine = createAsyncThunk('routines/deleteRoutine', async (routineId, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.delete(`/tasks/${routineId}/`)
        window.analytics.track('Deleted a routine.')
        if (response.status === 204) {
            return routineId
        }
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }

})

// Create slice
export const routinesSlice = createSlice({
    name: 'routine',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchRoutines.fulfilled]: routinesAdapter.setAll,
        [fetchRoutine.fulfilled]: routinesAdapter.upsertOne,
        [addNewRoutine.fulfilled]: routinesAdapter.addOne,
        [updateRoutine.fulfilled]: (state, { payload }) => {
            const { id, ...changes} = payload
            routinesAdapter.updateOne(state, {id, changes});
        },
        [deleteRoutine.fulfilled]: routinesAdapter.removeOne,
        [logout.fulfilled]: routinesAdapter.removeAll,
        [logout.rejected]: routinesAdapter.removeAll
    }
});

// Export the Routine reducer
export default routinesSlice.reducer

// Export selectors
export const {
    selectAll: selectAllRoutines,
    selectById: selectRoutineById,
    selectIds: selectRoutineIds,
    selectEntities: selectRoutineEntities
  } = routinesAdapter.getSelectors(state => state.routines)