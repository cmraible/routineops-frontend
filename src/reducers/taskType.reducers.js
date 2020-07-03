import {
  GET_TASK_TYPES_SUCCESS,
  ADD_TASK_TYPE_SUCCESS,
  DELETE_TASK_TYPE_SUCCESS,
  SAVE_TASK_TYPE_SUCCESS
} from '../actions/taskType.actions';
import {
  LOGOUT
} from '../actions/auth.actions';
import { combineReducers } from 'redux';


const taskType = (state, action) => {
  switch (action.type) {
    case ADD_TASK_TYPE_SUCCESS:
    case SAVE_TASK_TYPE_SUCCESS:
      return action.taskType
    default:
      return state
  }
}

function byId(state = {}, action) {
  switch (action.type) {
    case GET_TASK_TYPES_SUCCESS:
      if ('taskTypes' in action.taskTypes.entities) {
        return action.taskTypes.entities.taskTypes
      } else {
        return {}
      }
    case ADD_TASK_TYPE_SUCCESS:
    case SAVE_TASK_TYPE_SUCCESS:
      return {
        ...state,
        [action.taskType.id]: taskType(undefined, action)
      }
    
    case DELETE_TASK_TYPE_SUCCESS:
      const {[action.taskType]: omit, ...rest} = state;
      return rest
    case LOGOUT:
      return {}
    default:
      return state
  }
}

function allIds(state = [], action) {
  switch (action.type) {
    case GET_TASK_TYPES_SUCCESS:
      return action.taskTypes.result
    case ADD_TASK_TYPE_SUCCESS:
      return [...state, action.taskType.id]
    case DELETE_TASK_TYPE_SUCCESS:
      return state.filter(id => action.taskType !== id)
    case LOGOUT:
      return []
    default:
      return state
  }
}

const taskTypeReducer = combineReducers({
  byId,
  allIds
})

export default taskTypeReducer;

export const getAllTaskTypes = (state) =>
  state.allIds.map(id => state.byId[id]);