import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import monitorReducersEnhancer from './enhancers/monitorReducers.js';
import loggerMiddleware from './middleware/logger.js';
import createRootReducer from './reducers/reducers.js';
import history from './history.js';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';


export default function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware, thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)
  const rootReducer = createRootReducer(history)

  const persistedState = loadState()
  const store = createStore(rootReducer, persistedState, composedEnhancers)

  store.subscribe(throttle(() => {
    saveState(store.getState())
  }, 1000))


  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers/reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}
