import { combineReducers } from 'redux'
import { LOGOUT } from '../actions/auth.actions';
import {
  ADD_TASK_LAYER_SUCCESS,
  DELETE_TASK_LAYER_SUCCESS,
  GET_TASK_LAYERS_SUCCESS
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

const taskLayerReducer = combineReducers({
  byId,
  allIds
})

export default taskLayerReducer;

export const getAllTaskLayers = (state) =>
  state.allIds.map(id => state.byId[id])

  export const getTaskLayersForTask = (state, task) =>
  state.allIds.map(id => {
    const layer = state.byId[id]
    if (layer.task === task.id) {
      return state.byId[id]
    }
})
