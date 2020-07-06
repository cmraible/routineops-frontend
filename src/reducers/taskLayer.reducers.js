import { combineReducers } from 'redux'
import { LOGOUT } from '../actions/auth.actions';
import {
  ADD_TASK_LAYER_SUCCESS,
  DELETE_TASK_LAYER_SUCCESS,
  GET_TASK_LAYERS_SUCCESS,
  SAVE_TASK_LAYER_SUCCESS
} from '../actions/taskLayer.actions';

const taskLayer = (state, action) => {
  switch (action.type) {
    case ADD_TASK_LAYER_SUCCESS:
      return action.taskLayer
    case SAVE_TASK_LAYER_SUCCESS:
      return action.taskLayer
    default:
      return state
  }
}

function byId(state = {}, action) {
  switch (action.type) {
    case GET_TASK_LAYERS_SUCCESS:
      if ('taskLayers' in action.taskLayers.entities) {
        return action.taskLayers.entities.taskLayers
      } else {
        return {}
      }
      
    case ADD_TASK_LAYER_SUCCESS:
      return {
        ...state,
        [action.taskLayer.id]: taskLayer(undefined, action)
      }
    case SAVE_TASK_LAYER_SUCCESS:
      return Object.assign({}, state, action.taskLayer)
    case DELETE_TASK_LAYER_SUCCESS:
      const {[action.taskLayer]: omit, ...rest } = state;
      return rest
    case LOGOUT:
      return {}
    default:
      return state
  }
}

function allIds(state = [], action) {
  switch (action.type) {
    case GET_TASK_LAYERS_SUCCESS:
      return action.taskLayers.result
    case ADD_TASK_LAYER_SUCCESS:
      return [...state, action.taskLayer.id]
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
