import { Box, Grommet } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { getLoggedInUser } from '../reducers/reducers';
import routineopsTheme from '../routineopsTheme';
import Calendar from './Calendar';
import Dashboard from './Dashboard';
import DefaultSidebar from './DefaultSidebar';
import Forgot from './Forgot';
import ForgotReset from './ForgotReset';
import ForgotResetSuccess from './ForgotResetSuccess';
import ForgotSuccess from './ForgotSuccess';
import Home from './Home';
import Invitation from './Invitation';
import Login from './Login';
import Onboarding from './Onboarding';
import Profile from './Profile';
import Roles from './Roles';
import Organization from './Organization';
import Signup from './Signup';
import Tasks from './Tasks';
import Users from './Users';

const App = ({ isLoggedIn, theme, darkMode, organization, user }) => {

  // Renders different routers depending on application state.
  // Particularly, is user logged in? Has organization been fully onboarded?
  // # TODO: Need to refactor this. Messy entrypoint...

  const onboardComplete = (user && user.onboard_complete && organization.onboard_complete) || false

  if (isLoggedIn && !onboardComplete) {
    return (
      <Grommet theme={theme} full themeMode={ darkMode ? "dark" : "light" }>
        <Switch>
          <Route path="/" component={Onboarding} />
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
              <Route path="/profile" component={Profile} />
              <Route exact path="/roles" component={Roles} />
              <Route exact path="/roles/:role_id" component={Roles} />
              <Route path="/organization" component={Organization} />
              <Route exact path="/tasks" component={Tasks} />
              <Route exact path="/task/:task_id" component={Tasks} />
              <Route exact path="/users" component={Users} />
            </Box>          
        </Switch>
      </Grommet>
    )
  } else {
    return (
      <Grommet theme={theme} full themeMode={ darkMode ? "dark" : "light" }>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/signup/?email=adfasd" />
            <Route exact path="/forgot" component={Forgot} />
            <Route exact path="/forgotsuccess" component={ForgotSuccess} />
            <Route exact path="/reset/:uid/:token" component={ForgotReset} />
            <Route exact path="/resetsuccess" component={ForgotResetSuccess} />
            <Route exact path="/invite/:invite_id" component={Invitation} />
            <Route component={Login} />
        </Switch>
      </Grommet>
    )
  }
};

const mapStateToProps = state => ({
  organization: state.organization.organization,
  darkMode: state.ui.darkMode,
  theme: routineopsTheme,
  isLoggedIn: state.auth.isLoggedIn,
  user: getLoggedInUser(state)
});

export default  withRouter( connect(mapStateToProps, {

})(App) )