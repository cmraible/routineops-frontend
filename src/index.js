import React from 'react';
import ReactDOM from 'react-dom';
import { Grommet } from 'grommet'
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import operationallyTheme from './operationallyTheme.js';


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
