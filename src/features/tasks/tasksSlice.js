import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import getClient from '../../apiClient';
import { logout } from '../auth/authSlice';

// Adapter to normalize and sort response data
const tasksAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.id > a.id
});

// Adapter creates default 'entities' and 'ids' entries. Add additional params to state here.
const initialState = tasksAdapter.getInitialState({});

// Async thunks to interact with API
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (data, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.get('/tasks/');
    return response.data
});

export const fetchTask = createAsyncThunk('tasks/fetchTask', async (taskId, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.get(`/tasks/${taskId}`);
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
});

export const addNewTask = createAsyncThunk('tasks/addNewTask', async (taskData, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.post('/tasks/', taskData)
        console.log(response)
        window.analytics.track('Added a task.')
        return response.data
    } catch (err) {
        console.log(err)
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const updateTask = createAsyncThunk('tasks/updateTask', async (taskData, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.patch(`/tasks/${taskData.id}/`, taskData)
        window.analytics.track('Updated a task.')
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.delete(`/tasks/${taskId}/`)
        window.analytics.track('Deleted a task.')
        if (response.status === 204) {
            return taskId
        }
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }

})

// Create slice
export const tasksSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchTasks.fulfilled]: tasksAdapter.setAll,
        [fetchTask.fulfilled]: tasksAdapter.upsertOne,
        [addNewTask.fulfilled]: tasksAdapter.addOne,
        [updateTask.fulfilled]: (state, { payload }) => {
            const { id, ...changes} = payload
            tasksAdapter.updateOne(state, {id, changes});
        },
        [deleteTask.fulfilled]: tasksAdapter.removeOne,
        [logout.fulfilled]: tasksAdapter.removeAll,
        [logout.rejected]: tasksAdapter.removeAll
    }
});

// Export the task reducer
export default tasksSlice.reducer

// Export selectors
export const {
    selectAll: selectAllTasks,
    selectById: selectTaskById,
    selectIds: selectTaskIds,
    selectEntities: selectTaskEntities
  } = tasksAdapter.getSelectors(state => state.tasks)