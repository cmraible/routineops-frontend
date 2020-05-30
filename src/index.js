import React from 'react';
import ReactDOM from 'react-dom';
import { Grommet } from 'grommet'
import App from './App';
import Login from './Login';
import operationallyTheme from './operationallyTheme.js'


if (window.localStorage.getItem('stacks.token') == null) {
  ReactDOM.render(
    <React.StrictMode>
      <Grommet theme={operationallyTheme} full={true}>
        <Login />
      </Grommet>
    </React.StrictMode>,
    document.getElementById('root')
  );
} else {
  ReactDOM.render(
    <React.StrictMode>
      <Grommet theme={operationallyTheme} full={true}>
        <App />
      </Grommet>
    </React.StrictMode>,
    document.getElementById('root')
  );
}
