import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { selectNumberLoggedInUsers } from '../features/auth/authSlice';
import Forgot from '../features/auth/Forgot';
import ForgotReset from '../features/auth/ForgotReset';
import Login from '../features/auth/Login';
import LoginOptions from '../features/auth/LoginOptions';
import Signup from '../features/auth/Signup';
import SwitchAccounts from '../features/auth/SwitchAccounts';
import { useSelector } from 'react-redux';


const AppLoggedOut = () => {
  const num_accounts = useSelector(selectNumberLoggedInUsers)
  console.log(num_accounts)

  if (num_accounts > 0) {
    // show switch accounts
    return (
      <Switch>         
        <Route exact path="/login" component={LoginOptions} />
        <Route exact path="/login/email" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/forgot" component={Forgot} />
        <Route path="/" component={SwitchAccounts} />

      </Switch>
    )
  } else {
    return (
      <Switch>  
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/forgot" component={Forgot} />
        <Route exact path="/reset/:uid/:token" component={ForgotReset} />
        <Route exact path="/invite/:inviteId" component={Signup} />
        <Route exact path="/login" component={LoginOptions} />
        <Route exact path="/login/email" component={Login} />
        <Route exact path="/switchaccounts" component={SwitchAccounts} />
        <Route path="/" component={LoginOptions} />
      </Switch>
    )
  }
};

export default AppLoggedOut;