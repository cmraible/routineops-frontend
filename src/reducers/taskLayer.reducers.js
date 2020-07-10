import { combineReducers } from 'redux'
import { LOGOUT } from '../actions/auth.actions';
import {
  ADD_TASK_LAYER_SUCCESS,
  DELETE_TASK_LAYER_SUCCESS,
  GET_TASK_LAYERS_SUCCESS,
  ADD_TASK_LAYER_REQUEST,
  DELETE_TASK_LAYER_REQUEST,
  GET_TASK_LAYERS_REQUEST,
  SAVE_TASK_LAYER_REQUEST,
  ADD_TASK_LAYER_FAIL,
  GET_TASK_LAYERS_FAIL,
  SAVE_TASK_LAYER_FAIL,
  DELETE_TASK_LAYER_FAIL,
  SAVE_TASK_LAYER_SUCCESS
} from '../actions/taskLayer.actions';
import merge from 'lodash/merge';


function byId(state = {}, action) {
  switch (action.type) {
    case DELETE_TASK_LAYER_SUCCESS:
      const {[action.taskLayer]: omit, ...rest } = state;
      return rest
    case LOGOUT:
      return {}
    default:
      if (action.entities && action.entities.taskLayers) {
        return merge({}, state, action.entities.taskLayers)
      }
      return state
  }
}

function allIds(state = [], action) {
  switch (action.type) {
    case GET_TASK_LAYERS_SUCCESS:
      return action.result
    case ADD_TASK_LAYER_SUCCESS:
      return [...state, action.result]
    case DELETE_TASK_LAYER_SUCCESS:
      return state.filter((id) => action.taskLayer !== id )
    case LOGOUT:
      return []
    default:
      return state
  }
}

function isFetching(state = false, action) {
  switch (action.type) {
    case ADD_TASK_LAYER_REQUEST:
    case GET_TASK_LAYERS_REQUEST:
    case SAVE_TASK_LAYER_REQUEST:
    case DELETE_TASK_LAYER_REQUEST:
      return true;
    case ADD_TASK_LAYER_SUCCESS:
    case ADD_TASK_LAYER_FAIL:
    case GET_TASK_LAYERS_SUCCESS:
    case GET_TASK_LAYERS_FAIL:
    case SAVE_TASK_LAYER_SUCCESS:
    case SAVE_TASK_LAYER_FAIL:
    case DELETE_TASK_LAYER_SUCCESS:
    case DELETE_TASK_LAYER_FAIL:
      return false;
    default:
      return state
  }
}

const taskLayerReducer = combineReducers({
  byId,
  allIds,
  isFetching
})

export default taskLayerReducer;

export const getAllTaskLayers = (state) =>
  state.allIds.map(id => state.byId[id])

  export const getTaskLayersForTask = (state, task) =>
  state.allIds.filter((id) => {
    const layer = state.byId[id]
    return (layer.task === task.id)
  }).map(id => {
    return state.byId[id]
});
