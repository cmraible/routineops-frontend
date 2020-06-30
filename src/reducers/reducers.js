import { combineReducers } from 'redux';
import taskReducer, * as fromTasks from './task.reducers.js';
import roleReducer, * as fromRoles from './role.reducers.js';
import authReducer from './auth.reducers.js';
import userReducer from './user.reducers.js';
import organizationReducer from './organization.reducers.js';
import taskLayerReducer, * as fromTaskLayers from './taskLayer.reducers.js';
import uiReducer from './ui.reducers.js';
import { connectRouter } from 'connected-react-router'

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  tasks: taskReducer,
  roles: roleReducer,
  auth: authReducer,
  user: userReducer,
  organization: organizationReducer,
  taskLayers: taskLayerReducer,
  ui: uiReducer
})

export default createRootReducer;

export const getAllRoles = (state) =>
  fromRoles.getAllRoles(state.roles);

export const getAllTasks = (state) =>
  fromTasks.getAllTasks(state.tasks);

export const getAllTaskLayers = (state) =>
  fromTaskLayers.getAllTaskLayers(state.taskLayers);
