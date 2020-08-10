import {
  GET_TASK_INSTANCES_SUCCESS,
  COMPLETE_TASK_INSTANCE_SUCCESS,
  DELETE_TASK_INSTANCE_SUCCESS,
  SAVE_TASK_INSTANCE_SUCCESS,
  GET_TASK_INSTANCES_REQUEST,
  SAVE_TASK_INSTANCE_REQUEST,
  DELETE_TASK_INSTANCE_REQUEST,
  COMPLETE_TASK_INSTANCE_REQUEST,
  GET_TASK_INSTANCES_FAIL,
  SAVE_TASK_INSTANCE_FAIL,
  DELETE_TASK_INSTANCE_FAIL,
  COMPLETE_TASK_INSTANCE_FAIL
} from '../actions/taskInstance.actions';
import {
  LOGOUT
} from '../actions/auth.actions';
import { combineReducers } from 'redux';
import merge from 'lodash/merge';

function byId(state = {}, action) {
  switch (action.type) {
    case DELETE_TASK_INSTANCE_SUCCESS:
      const {[action.taskInstance]: omit, ...rest} = state;
      return rest
    case LOGOUT:
      return {}
    default:
      if (action.entities && action.entities.taskInstances) {
        return merge({}, state, action.entities.taskInstances)
      }
      return state
  }
}

function allIds(state = [], action) {
  switch (action.type) {
    case GET_TASK_INSTANCES_SUCCESS:
      return action.result
    case DELETE_TASK_INSTANCE_SUCCESS:
      return state.filter(id => action.taskInstance !== id)
    case LOGOUT:
      return []
    default:
      return state
  }
}

function isFetching(state = false, action) {
  switch (action.type) {
    case GET_TASK_INSTANCES_REQUEST:
    case SAVE_TASK_INSTANCE_REQUEST:
    case DELETE_TASK_INSTANCE_REQUEST:
    case COMPLETE_TASK_INSTANCE_REQUEST:
      return true;
    case GET_TASK_INSTANCES_SUCCESS:
    case GET_TASK_INSTANCES_FAIL:
    case SAVE_TASK_INSTANCE_SUCCESS:
    case SAVE_TASK_INSTANCE_FAIL:
    case DELETE_TASK_INSTANCE_SUCCESS:
    case DELETE_TASK_INSTANCE_FAIL:
    case COMPLETE_TASK_INSTANCE_SUCCESS:
    case COMPLETE_TASK_INSTANCE_FAIL:
      return false;
    default:
      return state
  }
}

const taskInstanceReducer = combineReducers({
  byId,
  allIds,
  isFetching
})

export default taskInstanceReducer;

export const getAllTaskInstances = (state) =>
  state.allIds.map(id => state.byId[id]);

export const getTaskInstancesForAssignee = (state, user) =>
  state.allIds.filter((id) => {
    const instance = state.byId[id]
    return (instance.assignee === user.id)
  }).map(id => {
    return state.byId[id]
  }).sort((a, b) => {
    return a.due - b.due
  });