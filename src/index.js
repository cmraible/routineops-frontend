import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { ConnectedRouter } from 'connected-react-router';
import configureStore from './configureStore';
import history from './history';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_SECRET_KEY);

const store = configureStore();

const renderApp = () =>
  render(
    <React.StrictMode>
      <Elements stripe={stripePromise} >
        <Provider store={store}>
            <ConnectedRouter history={history}>
              <App />
            </ConnectedRouter>
        </Provider>
      </Elements>
    </React.StrictMode>,
    document.getElementById('root')
  )

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/App', renderApp)
}

renderApp()
