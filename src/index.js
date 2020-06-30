import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { ConnectedRouter } from 'connected-react-router';
import configureStore from './configureStore';
import history from './history';

const store = configureStore();

const renderApp = () =>
  render(
    <React.StrictMode>
      <Provider store={store}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/App', renderApp)
}

renderApp()
