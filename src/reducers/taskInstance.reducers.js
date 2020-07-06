import {
  GET_TASK_INSTANCES_SUCCESS,
  COMPLETE_TASK_INSTANCE_SUCCESS,
  DELETE_TASK_INSTANCE_SUCCESS,
  SAVE_TASK_INSTANCE_SUCCESS
} from '../actions/taskInstance.actions';
import {
  LOGOUT
} from '../actions/auth.actions';
import { combineReducers } from 'redux';


const taskInstance = (state, action) => {
  switch (action.type) {
    case SAVE_TASK_INSTANCE_SUCCESS:
    case COMPLETE_TASK_INSTANCE_SUCCESS:
      return action.taskInstance
    default:
      return state
  }
}

function byId(state = {}, action) {
  switch (action.type) {
    case GET_TASK_INSTANCES_SUCCESS:
      if ('taskInstances' in action.taskInstances.entities) {
        return action.taskInstances.entities.taskInstances
      } else {
        return {}
      }
    case SAVE_TASK_INSTANCE_SUCCESS:
    case COMPLETE_TASK_INSTANCE_SUCCESS:
      return {
        ...state,
        [action.taskInstance.id]: taskInstance(undefined, action)
      }
    case DELETE_TASK_INSTANCE_SUCCESS:
      const {[action.taskInstance]: omit, ...rest} = state;
      return rest
    case LOGOUT:
      return {}
    default:
      return state
  }
}

function allIds(state = [], action) {
  switch (action.type) {
    case GET_TASK_INSTANCES_SUCCESS:
      return action.taskInstances.result
    case DELETE_TASK_INSTANCE_SUCCESS:
      return state.filter(id => action.taskInstance !== id)
    case LOGOUT:
      return []
    default:
      return state
  }
}

const taskInstanceReducer = combineReducers({
  byId,
  allIds
})

export default taskInstanceReducer;

export const getAllTaskInstances = (state) =>
  state.allIds.map(id => state.byId[id]);

export const getTaskInstancesForAssignee = (state, user) =>
  state.allIds.map(id => {
    const instance = state.byId[id]
    if (instance.assignee === user.id) {
      return state.byId[id]
    }
})