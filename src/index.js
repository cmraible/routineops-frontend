import React from 'react';
import ReactDOM from 'react-dom';
import { Grommet } from 'grommet';
import { Provider } from 'react-redux';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import operationallyTheme from './operationallyTheme.js';
import store from './store.js';


ReactDOM.render(
  <React.StrictMode>
    <Grommet theme={operationallyTheme} full={true}>
      <Router>
        <App />
      </Router>
    </Grommet>
  </React.StrictMode>,
  document.getElementById('root')
);
