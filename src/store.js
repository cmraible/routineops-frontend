import { saveState } from './localStorage';
import { configureStore } from '@reduxjs/toolkit';
import loggerMiddleware from './middleware/logger';
import rootReducer from './rootReducer';

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
    enhancers: []
  });

  store.subscribe(() => {
    saveState(store.getState())
  })

  if (window.Cypress || process.env.NODE_ENV !== 'production') {
    window.store = store;
  }

  return store
}
