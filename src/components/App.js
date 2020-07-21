import { Box, Grommet } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import operationallyTheme from '../operationallyTheme';
import Calendar from './Calendar';
import ConfirmEmail from './ConfirmEmail';
import Dashboard from './Dashboard';
import DefaultSidebar from './DefaultSidebar';
import Forgot from './Forgot';
import ForgotReset from './ForgotReset';
import ForgotResetSuccess from './ForgotResetSuccess';
import ForgotSuccess from './ForgotSuccess';
import Home from './Home';
import Login from './Login';
import OnboardUser from './OnboardUser';
import OnboardOrg from './OnboardOrg';
import Profile from './Profile';
import Role from './Role';
import Roles from './Roles';
import Settings from './Settings';
import Signup from './Signup';
import SignupSuccess from './SignupSuccess';
import OnboardSubscription from './OnboardSubscription';
import Task from './Task';
import Tasks from './Tasks';
import Users from './Users';

const App = ({ isLoggedIn, theme, darkMode, organization }) => {

  // Renders different routers depending on application state.
  // Particularly, is user logged in? Has organization been fully onboarded?

  const onboardComplete = organization.onboard_complete || false

  if (isLoggedIn && !onboardComplete) {
    return (
      <Grommet theme={theme} full themeMode={ darkMode ? "dark" : "light" }>
      <Switch>
        <Box align="start" direction="row" fill>
          <Route exact path="/onboard/user" component={OnboardUser} />
          <Route exact path="/onboard/org" component={OnboardOrg} />
          <Route exact path="/onboard/subscription" component={OnboardSubscription} />
        </Box>
      </Switch>
    </Grommet>
    )
  } else if (isLoggedIn && onboardComplete) {
    return (
      <Grommet theme={theme} full themeMode={ darkMode ? "dark" : "light" }>
        <Switch>
          <Box align="start" direction="row" fill>
              <DefaultSidebar />
              <Route exact path="/" component={Home} />
              <Route exact path="/calendar" component={Calendar} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/roles" component={Roles} />
              <Route exact path="/roles/:role_id" component={Role} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/tasks" component={Tasks} />
              <Route exact path="/task/:task_id" component={Task} />
              <Route exact path="/users" component={Users} />
          </Box>
        </Switch>
      </Grommet>
    )
  } else {
    return (
      <Grommet theme={theme} full themeMode={ darkMode ? "dark" : "light" }>
        <Switch>
          <Box align="start" direction="row" fill overflow="auto">
            <Route exact path="/" component={Login} />
            <Route exact path="/signup/1/" component={Signup} />
            <Route exact path="/signup/2/:email" component={SignupSuccess} />
            <Route exact path="/signup/3/:key/" component={ConfirmEmail} />
            <Route exact path="/forgot" component={Forgot} />
            <Route exact path="/forgotsuccess" component={ForgotSuccess} />
            <Route exact path="/reset/:uid/:token" component={ForgotReset} />
            <Route exact path="/resetsuccess" component={ForgotResetSuccess} />
          </Box>
        </Switch>
      </Grommet>
    )
  }
};

const mapStateToProps = state => ({
  organization: state.organization,
  darkMode: state.ui.darkMode,
  theme: operationallyTheme,
  isLoggedIn: state.auth.isLoggedIn
});

export default  withRouter( connect(mapStateToProps)(App) )
