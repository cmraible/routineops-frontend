import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import accountsReducer from './features/accounts/accountsSlice';
import authReducer from './features/auth/authSlice';
import checksReducer from './features/checks/checksSlice';
import invitationsReducer from './features/invitations/invitationsSlice';
import layersReducer from './features/layers/layersSlice';
import rolesReducer from './features/roles/rolesSlice';
import routinesReducer from './features/routines/routinesSlice';
import socialAccountsReducer from './features/socialaccounts/socialAccountsSlice';
import subscriptionReducer from './features/subscriptions/subscriptionsSlice';
import tasksReducer from './features/tasks/tasksSlice';
import uiReducer from './features/ui/uiSlice';
import userRolesReducer from './features/userRoles/userRolesSlice';
import usersReducer from './features/users/usersSlice';



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
    tasks: tasksReducer,
    layers: layersReducer,
    ui: uiReducer,
    userRoles: userRolesReducer,
    users: usersReducer
});

export default createRootReducer;