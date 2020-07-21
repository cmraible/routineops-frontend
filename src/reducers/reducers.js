import { connectRouter } from 'connected-react-router';
import { parseISO } from 'date-fns';
import { combineReducers } from 'redux';
import authReducer from './auth.reducers';
import checkReducer, * as fromChecks from './check.reducers';
import organizationReducer from './organization.reducers';
import roleReducer, * as fromRoles from './role.reducers';
import taskReducer, * as fromTasks from './task.reducers';
import taskInstanceReducer, * as fromTaskInstances from './taskInstance.reducers';
import taskLayerReducer, * as fromTaskLayers from './taskLayer.reducers';
import uiReducer from './ui.reducers';
import userReducer from './user.reducers';
import usersReducer, * as fromUsers from './users.reducers';
import userRoleReducer, * as fromUserRoles from './userRole.reducers';


const createRootReducer = history => combineReducers({
  auth: authReducer,
  checks: checkReducer,
  organization: organizationReducer,
  roles: roleReducer,
  router: connectRouter(history),
  tasks: taskReducer,
  taskInstances: taskInstanceReducer,
  taskLayers: taskLayerReducer,
  ui: uiReducer,
  user: userReducer,
  users: usersReducer,
  userRoles: userRoleReducer
})

export default createRootReducer;

export const getAllRoles = (state) =>
  fromRoles.getAllRoles(state.roles);

export const getAllTasks = (state) =>
  fromTasks.getAllTasks(state.tasks);

export const getAllTaskLayers = (state) =>
  fromTaskLayers.getAllTaskLayers(state.taskLayers);

export const getAllTaskInstances = (state) =>
  fromTaskInstances.getAllTaskInstances(state.taskInstances)

export const getTaskInstancesForAssignee = (state) =>
  fromTaskInstances.getTaskInstancesForAssignee(state.taskInstances, state.user.user)
  .sort((a, b) => parseISO(a.due) - parseISO(b.due))

export const getAllChecks = (state) =>
  fromChecks.getAllChecks(state.checks)

export const getAllUsers = (state) =>
  fromUsers.getAllUsers(state.users)

export const getAllUserRoles = (state) =>
  fromUserRoles.getAllUserRoles(state.userRoles)

export const getUserActiveRoles = (state) =>
  fromUserRoles.getUserActiveRoles(state.userRoles, state.user.user)