import {
  GET_TASKS_SUCCESS,
  ADD_TASK_SUCCESS,
  DELETE_TASK_SUCCESS
} from '../actions/task.actions';
import {
  LOGOUT
} from '../actions/auth.actions';
import { combineReducers } from 'redux';
import merge from 'lodash/merge';

function byId(state = {}, action) {
  switch (action.type) {
    case DELETE_TASK_SUCCESS:
      const {[action.task]: omit, ...rest} = state;
      return rest
    case LOGOUT:
      return {}
    default:
      if (action.entities && action.entities.tasks) {
        return merge({}, state, action.entities.tasks)
      }
      return state
  }
}

function allIds(state = [], action) {
  switch (action.type) {
    case GET_TASKS_SUCCESS:
      return action.result
    case ADD_TASK_SUCCESS:
      return [...state, action.result]
    case DELETE_TASK_SUCCESS:
      return state.filter(id => action.task !== id)
    case LOGOUT:
      return []
    default:
      return state
  }
}

const taskReducer = combineReducers({
  byId,
  allIds
})

export default taskReducer;

export const getAllTasks = (state) =>
  state.allIds.map(id => state.byId[id]);
  