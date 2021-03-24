import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getClient from '../../apiClient';
import { push } from 'connected-react-router';



// Adapter creates default 'entities' and 'ids' entries. Add additional params to state here.
const initialState = {
    token: undefined,
    userId: undefined
};

// Async thunks to interact with API
export const login = createAsyncThunk('auth/login', async (credentials, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.post('/auth/login/', credentials);
        dispatch(push('/'));
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
});

export const changePassword = createAsyncThunk('auth/changePassword', async (passwords, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.post('/auth/password/change/', passwords)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
});

export const loginWithGoogle = createAsyncThunk('auth/loginWithGoogle', async (code, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.post('/auth/google/', {code: code})
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
});

export const connectGoogle = createAsyncThunk('auth/connectGoogle', async (code, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.post('/auth/google/connect/', {code: code})
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
});


export const logout = createAsyncThunk('auth/logout', async (data, { dispatch, getState }) => {
    dispatch(push('/'));
    const client = getClient(dispatch, getState);
    const response = await client.post('/auth/logout/');
    window.localStorage.removeItem('routineops-token');
    window.localStorage.removeItem('routineopsState');
    window.analytics.track('Logged out.');
    window.analytics.reset();
    return response.data
})

export const signup = createAsyncThunk('auth/signup', async (data, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.post('/auth/register/', data)
        window.analytics.alias(response.data.user.id)
        if (response.data.user.is_account_owner) {
            window.analytics.track('Account Created', {
              context: {groupId: response.data.user.account
              }
            });
        }
        dispatch(push('/'))
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }

});

export const resetPasswordRequest = createAsyncThunk('auth/resetPasswordRequest', async (email, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.post('/auth/password/reset/', {email: email})
        window.analytics.track('Password reset link requested.', {email: email})
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }

})

export const resetPassword = createAsyncThunk('auth/resetPassword', async (data, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.post('/auth/password/reset/confirm/', data)
        window.analytics.track('Reset password.')
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})


// Create slice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.token = action.payload.key
            state.userId = action.payload.user.id
        },
        [loginWithGoogle.fulfilled]: (state, action) => {
            state.token = action.payload.key
            state.userId = action.payload.user.id
        },
        [logout.rejected]: (state, action) => {
            state.token = undefined
            state.userId = undefined
        },
        [logout.fulfilled]: (state, action) => {
            state.token = undefined
            state.userId = undefined
        }
    }
});

// Export the check reducer
export default authSlice.reducer

export const selectLoggedInUser = (state) => state.users.entities[state.auth.userId];
export const selectIsLoggedIn = (state) => (state.auth.token) ? true : false;
export const selectToken = (state) => state.auth.token;
