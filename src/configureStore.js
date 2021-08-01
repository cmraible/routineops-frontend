import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { saveState } from './localStorage';
import loggerMiddleware from './middleware/logger';
import createRootReducer from './rootReducer';

export const history = createBrowserHistory()

const configureStore = (preloadedState) => {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunk,
        loggerMiddleware
      )
    )
  )

  store.subscribe(() => {
    saveState(store.getState())
  });

  if (window.Cypress || process.env.NODE_ENV !== 'production') {
    window.store = store;
  }

  return store
}

export default configureStore;
