import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import getClient from '../../apiClient';

// Adapter to normalize and sort response data
const userRolesAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.id > a.id
});

// Adapter creates default 'entities' and 'ids' entries. Add additional params to state here.
const initialState = userRolesAdapter.getInitialState({});


// Async thunks to interact with API
export const fetchUserRoles = createAsyncThunk('userRoles/fetchUserRoles', async (data, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.get('/userroles/');
    return response.data
});

export const addNewUserRole = createAsyncThunk('userRoles/addNewUserRole', async (userRoleData, { dispatch, getState }) => {
    const client = getClient(dispatch, getState);
    const response = await client.post('/userroles/', userRoleData)
    window.analytics.track('Created a user role.');
    return response.data
})

export const deleteUserRole = createAsyncThunk('userRoles/deleteUserRole', async (userRoleId, { dispatch, getState, rejectWithValue }) => {
    try {
        const client = getClient(dispatch, getState);
        const response = await client.delete(`/userroles/${userRoleId}/`)
        window.analytics.track('Deleted a user role.');
        if (response.status === 204) {
            return userRoleId;
        }
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }

})

// Create slice
export const userRolesSlice = createSlice({
    name: 'userRole',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUserRoles.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            userRolesAdapter.setAll(state, action.payload)
        },
        [addNewUserRole.fulfilled]: userRolesAdapter.addOne,
        [deleteUserRole.fulfilled]: userRolesAdapter.removeOne,
    }
});

// Export the userRole reducer
export default userRolesSlice.reducer

// Export selectors
export const {
    selectAll: selectAllUserRoles,
    selectById: selectUserRoleById,
    selectIds: selectUserRoleIds,
    selectEntities: selectUserRoleEntities
  } = userRolesAdapter.getSelectors(state => state.userRoles)

  export const selectActiveUserRolesForUser = (state, userId) => {
      const all = selectAllUserRoles(state);
      return all.filter((userRole) => {
          return userRole.user === userId && userRole.is_active === true
      })
  }