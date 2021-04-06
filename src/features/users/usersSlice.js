import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import getClient from '../../apiClient';
import { login, loginWithGoogle, logout } from '../auth/authSlice';

// Adapter to normalize and sort response data
const usersAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.id > a.id
});

// Adapter creates default 'entities' and 'ids' entries. Add additional params to state here.
const initialState = usersAdapter.getInitialState({});

// Async thunks to interact with API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (data, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.get('/users/');
    return response.data
});

export const fetchUser = createAsyncThunk('users/fetchUser', async (userId, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.get(`/users/${userId}/`);
    return response.data
})

export const updateUser = createAsyncThunk('users/updateUser', async (userData, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.patch(`/users/${userData.id}/`, userData)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const updateUserPhone = createAsyncThunk('users/updateUserPhone', async (data, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.patch(`/users/${data.userId}/phone/`, {phone: data.phone})
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const verifyUserPhone = createAsyncThunk('users/verifyUserPhone', async (data, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.post(`/users/${data.userId}/verifyphone/`, {to: data.phone, code: data.code})
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

// Create slice
export const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchUsers.fulfilled]: (state, action) => {
            usersAdapter.setAll(state, action.payload)
        },
        [fetchUser.fulfilled]: usersAdapter.upsertOne,
        [updateUser.fulfilled]: (state, { payload }) => {
            const { id, ...changes } = payload
            console.log(changes);
            usersAdapter.updateOne(state, {id, changes});
        },
        [login.fulfilled]: (state, action) => {
            usersAdapter.upsertOne(state, action.payload.user)
        },
        [loginWithGoogle.fulfilled]: (state, action) => {
            usersAdapter.upsertOne(state, action.payload.user)
        },
        [logout.fulfilled]: usersAdapter.removeAll,
        [logout.rejected]: usersAdapter.removeAll
    }
});

// Export the user reducer
export default usersSlice.reducer

// Export selectors
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds,
    selectEntities: selectUserEntities
  } = usersAdapter.getSelectors(state => state.users)