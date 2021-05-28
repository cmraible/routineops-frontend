import { combineReducers } from 'redux';
import uiReducer from './features/ui/uiSlice';
import routinesReducer from './features/routines/routinessSlice';
import checksReducer from './features/checks/checksSlice';
import rolesReducer from './features/roles/rolesSlice';
import usersReducer from './features/users/usersSlice';
import authReducer from './features/auth/authSlice';
import taskInstancesReducer from './features/taskInstances/taskInstancesSlice';
import layersReducer from './features/layers/layersSlice';
import accountsReducer from './features/accounts/accountsSlice';
import socialAccountsReducer from './features/socialaccounts/socialAccountsSlice';
import subscriptionReducer from './features/subscriptions/subscriptionsSlice';
import invitationsReducer from './features/invitations/invitationsSlice';
import userRolesReducer from './features/userRoles/userRolesSlice';
import { connectRouter } from 'connected-react-router';

const createRootReducer = (history) => combineReducers({
    auth: authReducer,
    checks: checksReducer,
    invitations: invitationsReducer,
    accounts: accountsReducer,
    socialaccounts: socialAccountsReducer,
    subscriptions: subscriptionReducer,
    roles: rolesReducer,
    router: connectRouter(history),
    routines: routinesReducer,
    taskInstances: taskInstancesReducer,
    layers: layersReducer,
    ui: uiReducer,
    userRoles: userRolesReducer,
    users: usersReducer
});

export default createRootReducer;