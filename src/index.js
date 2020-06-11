import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './configureStore.js';


const persistedState = localStorage.getItem('operationallyState')
                       ? JSON.parse(localStorage.getItem('operationallyState'))
                       : {}

const store = configureStore(persistedState);

store.subscribe(()=>{
  localStorage.setItem('operationallyState', JSON.stringify(store.getState()))
})

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/App', renderApp)
}

const renderApp = () =>
  render(
    <React.StrictMode>
      <Provider store={store}>
          <Router>
            <App />
          </Router>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/App', renderApp)
}

renderApp()
