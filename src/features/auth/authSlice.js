import { createAsyncThunk, createEntityAdapter, createSlice, createAction } from '@reduxjs/toolkit';
import getClient from '../../apiClient';
import { push } from 'connected-react-router';
import { loginUser } from '../../utils';

// Adapter to normalize and sort response data
const credentialsAdapter = createEntityAdapter({
    selectId: (entity) => entity.user.id
});

// Adapter creates default 'entities' and 'ids' entries. Add additional params to state here.
const initialState =
    credentialsAdapter.getInitialState({
        loggedInUser: false
    });

// Async thunks to interact with API
export const login = createAsyncThunk('auth/login', async (credentials, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.post('/auth/login/', credentials);
        dispatch(push('/'));
        loginUser(response.data.user);
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
});

export const switchAccounts = createAction('SWITCH_ACCOUNTS');

export const chooseAccount = createAction('CHOOSE_ACCOUNT');

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
        loginUser(response.data.user);
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
    window.localStorage.removeItem('routineops-token');
    window.localStorage.removeItem('routineopsState');
    window.analytics.track('Logged out.');
    // Commented out because Intercom was removed
    // window.Intercom('shutdown');
    window.analytics.reset();
    dispatch(push('/'));
    const client = getClient(dispatch, getState);
    const response = await client.post('/auth/logout/');

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
        loginUser(response.data.user);
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
        [switchAccounts]: (state) => {
            state.loggedInUser = false;
        },
        [chooseAccount]: (state, {payload}) => {
            state.loggedInUser = payload;
        },
        [signup.fulfilled]: (state, {payload}) => {
            credentialsAdapter.upsertOne(state, payload);
            state.loggedInUser = payload.user.id
        },
        [login.fulfilled]: (state, { payload }) => {
           credentialsAdapter.upsertOne(state, payload)
           state.loggedInUser = payload.user.id
        },
        [loginWithGoogle.fulfilled]: (state, { payload }) => {
            credentialsAdapter.upsertOne(state, payload)
            state.loggedInUser = payload.user.id
         },
        [logout.rejected]: (state) => {
            credentialsAdapter.removeAll(state);
            state.loggedInUser = false;
        },
        [logout.fulfilled]: (state) => {
            credentialsAdapter.removeAll(state);
            state.loggedInUser = false;
        }
    }
});

// Export the check reducer
export default authSlice.reducer;

export const {
    selectAll: selectAllAuthorizedUsers
} = credentialsAdapter.getSelectors(state => state.auth)

export const selectIsLoggedIn = (state) => (state.auth.loggedInUser);
export const selectNumberLoggedInUsers = (state) => (state.auth.ids.length);
export const selectLoggedInUser = (state) => {
    if (selectIsLoggedIn(state)) {
        if (state.users.entities[state.auth.loggedInUser]) {
            return state.users.entities[state.auth.loggedInUser]
        } else {
            return state.auth.entities[state.auth.loggedInUser].user;
        }
    } else {
        return false
    }
}
export const selectToken = (state) => {
    if (selectIsLoggedIn(state)) {
        return state.auth.entities[selectLoggedInUser(state).id].key;
    } else {
        return false
    }
}
