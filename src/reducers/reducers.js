import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import authReducer from './auth.reducers.js';
import checkReducer, * as fromChecks from './check.reducers.js';
import organizationReducer from './organization.reducers.js';
import roleReducer, * as fromRoles from './role.reducers.js';
import taskReducer, * as fromTasks from './task.reducers.js';
import taskLayerReducer, * as fromTaskLayers from './taskLayer.reducers.js';
import uiReducer from './ui.reducers.js';
import userReducer from './user.reducers.js';
import taskInstanceReducer, * as fromTaskInstances from './taskInstance.reducers.js';
import { parseISO } from 'date-fns';



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
  user: userReducer
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
  fromTaskInstances.getTaskInstancesForAssignee(state.taskInstances, state.user)
  .sort((a, b) => parseISO(a.due) - parseISO(b.due))

export const getAllChecks = (state) =>
  fromChecks.getAllChecks(state.checks)
