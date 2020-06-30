import {
  GET_TASKS_SUCCESS,
  ADD_TASK_SUCCESS,
  DELETE_TASK_SUCCESS
} from '../actions/task.actions';
import {
  LOGOUT
} from '../actions/auth.actions';
import { combineReducers } from 'redux';


const task = (state, action) => {
  switch (action.type) {
    case ADD_TASK_SUCCESS:
      return action.task
    default:
      return state
  }
}

function byId(state = {}, action) {
  switch (action.type) {
    case GET_TASKS_SUCCESS:
      if ('tasks' in action.tasks.entities) {
        return action.tasks.entities.tasks
      } else {
        return {}
      }
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        [action.task.id]: task(undefined, action)
      }
    case DELETE_TASK_SUCCESS:
      const {[action.task]: omit, ...rest} = state;
      return rest
    case LOGOUT:
      return {}
    default:
      return state
  }
}

function allIds(state = [], action) {
  switch (action.type) {
    case GET_TASKS_SUCCESS:
      return action.tasks.result
    case ADD_TASK_SUCCESS:
      return [...state, action.task.id]
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