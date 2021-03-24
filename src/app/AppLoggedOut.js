import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Forgot from '../features/auth/Forgot';
import ForgotReset from '../features/auth/ForgotReset';
import Login from '../features/auth/Login';
import LoginOptions from '../features/auth/LoginOptions';
import Signup from '../features/auth/Signup';

const AppLoggedOut = () => {
  return (
    <Switch>
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/forgot" component={Forgot} />
      <Route exact path="/reset/:uid/:token" component={ForgotReset} />
      <Route exact path="/invite/:inviteId" component={Signup} />
      <Route exact path="/login" component={LoginOptions} />
      <Route exact path="/login/email" component={Login} />
      <Route path="/" component={LoginOptions} />
    </Switch>
  )
};

export default AppLoggedOut;