import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import getClient from '../../apiClient';
import { logout, selectLoggedInUser } from '../auth/authSlice';
import { selectLayerById } from '../layers/layersSlice';
import { selectActiveUserRolesForUser } from '../userRoles/userRolesSlice';
import { DateTime } from 'luxon'; 

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

export const fetchTask = createAsyncThunk('tasks/fetchTask', async (taskId, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.get(`/tasks/${taskId}`);
    return response.data
});

export const addNewTask = createAsyncThunk('tasks/addNewTask', async (taskData, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.post('/tasks/', taskData)
    return response.data
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (taskData, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.patch(`/tasks/${taskData.id}/`, taskData)
    return response.data
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.delete(`/tasks/${taskId}/`)
    return response.data
});

export const completeTask = createAsyncThunk('tasks/completeTask', async (data, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const task = data[0]
    const results = data[1]
    const response = await client.post(`/tasks/${task.id}/complete/`, results)
    window.analytics.track('Completed a task.');
    return response.data
});

// Create slice
export const tasksSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchTasks.fulfilled]: tasksAdapter.setAll,
        [fetchTask.fulfilled]: tasksAdapter.upsertOne,
        [addNewTask.fulfilled]: tasksAdapter.addOne,
        [updateTask.fulfilled]: (state, { payload}) => {
            const { id, ...changes } = payload
            tasksAdapter.updateOne(state, {id, changes});
        },
        [completeTask.fulfilled]: (state, { payload}) => {
            const { id, ...changes } = payload
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

  } = tasksAdapter.getSelectors(state => state.tasks)


export const selectUserTasks = (state) => {
    const user = selectLoggedInUser(state);
    const roles = selectActiveUserRolesForUser(state, user.id).map((item) =>  item.role);
    return selectAllTasks(state).filter((task) => {
        const layer = selectLayerById(state, task.layer);
        if (layer.type === 'Shared' && roles.some((role) => role === layer.role)) {
            return true
        }
        return task.assignee === user.id
    });
}

export const selectFilteredTasks = (state, filters) => {
    return selectAllTasks(state).filter((task) => {
        if (filters.completed === false) {
            if (task.completed) {
                return false
            }
        }
        const layer = selectLayerById(state, task.layer)
        if (layer.type === 'Shared') {
            // Layer type is shared -- check if any valid user is included
            // Check if any user in filters has a role which matches the layer
            
            if (filters.users.length > 0) {
                if (filters.users.some((user) => {
                    // Get all roles for user
                    const roles = selectActiveUserRolesForUser(state, user).map(item => item.role)
                    // If any of the user's roles match the layer, return true
                    if (roles.some(role => role === layer.role)) {
                        return true;
                    } else {
                        return false
                    }
                })) {
                    // At least one user has a role that matches the layer
                    return true
                } else {
                    // No users have a role that matches the layer
                    return false
                }
            } else {
                return true
            }
        } else {
            // Layer Type is individual -- just check the assignee
            if (filters.users.length > 0) {
                if (!filters.users.some(user => user === task.assignee)) {
                    return false;
                }
            } else {
                return true;
            }
        }
        return true
    }).sort((a, b) => {
        const aDue = DateTime.fromISO(a.due)
        const bDue = DateTime.fromISO(b.due)
        return aDue < bDue ? -1 : aDue > bDue ? 1 : 0;
    })
}