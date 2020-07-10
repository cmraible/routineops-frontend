import {
  GET_TASKS_SUCCESS,
  ADD_TASK_REQUEST,
  SAVE_TASK_REQUEST,
  GET_TASK_REQUEST,
  ADD_TASK_FAIL,
  SAVE_TASK_SUCCESS,
  SAVE_TASK_FAIL,
  GET_TASK_SUCCESS,
  GET_TASK_FAIL,
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

const isFetching = (state = false, action) => {
  switch (action.type) {
    case ADD_TASK_REQUEST:
    case SAVE_TASK_REQUEST:
    case GET_TASK_REQUEST:
      return true
    case ADD_TASK_SUCCESS:
    case ADD_TASK_FAIL:
    case SAVE_TASK_SUCCESS:
    case SAVE_TASK_FAIL:
    case GET_TASK_SUCCESS:
    case GET_TASK_FAIL:
      return false
    default:
      return state
  }
}

const taskReducer = combineReducers({
  byId,
  allIds,
  isFetching
})

export default taskReducer;

export const getAllTasks = (state) =>
  state.allIds.map(id => state.byId[id]).sort((a, b) => {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    else return 0
  });
  