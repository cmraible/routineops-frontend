import { combineReducers } from 'redux';
import uiReducer from './features/ui/uiSlice';
import tasksReducer from './features/tasks/tasksSlice';
import checksReducer from './features/checks/checksSlice';
import rolesReducer from './features/roles/rolesSlice';
import usersReducer from './features/users/usersSlice';
import authReducer from './features/auth/authSlice';
import taskInstancesReducer from './features/taskInstances/taskInstancesSlice';
import taskLayersReducer from './features/taskLayers/taskLayersSlice';
import accountsReducer from './features/accounts/accountsSlice';
import socialAccountsReducer from './features/socialaccounts/socialAccountsSlice';
import subscriptionReducer from './features/subscriptions/subscriptionsSlice';
import invitationsReducer from './features/invitations/invitationsSlice';
import userRolesReducer from './features/userRoles/userRolesSlice';
import { connectRouter } from 'connected-react-router';
import history from './history.js';

const appReducer = combineReducers({
    auth: authReducer,
    checks: checksReducer,
    invitations: invitationsReducer,
    accounts: accountsReducer,
    socialaccounts: socialAccountsReducer,
    subscriptions: subscriptionReducer,
    roles: rolesReducer,
    router: connectRouter(history),
    tasks: tasksReducer,
    taskInstances: taskInstancesReducer,
    taskLayers: taskLayersReducer,
    ui: uiReducer,
    userRoles: userRolesReducer,
    users: usersReducer
})

const rootReducer = (state, action) => {
    if (action.type === 'auth/logout/fulfilled') {
        state = undefined
    }
    return appReducer(state, action);
}

export default rootReducer;