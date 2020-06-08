import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import AppWrapper from './containers/AppWrapper';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './configureStore.js';
import { toggleDarkMode } from './actions';


const store = configureStore()


if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/App', renderApp)
}

const renderApp = () =>
  render(
    <React.StrictMode>
      <Provider store={store}>
          <Router>
            <AppWrapper />
          </Router>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/App', renderApp)
}

renderApp()
