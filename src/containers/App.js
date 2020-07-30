import { Box, Grommet } from 'grommet';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import routineopsTheme from '../routineopsTheme';
import Calendar from './Calendar';
import Dashboard from './Dashboard';
import DefaultSidebar from './DefaultSidebar';
import Forgot from './Forgot';
import ForgotReset from './ForgotReset';
import ForgotResetSuccess from './ForgotResetSuccess';
import ForgotSuccess from './ForgotSuccess';
import Home from './Home';
import Login from './Login';
import Onboarding from './Onboarding';
import Profile from './Profile';
import Role from './Role';
import Roles from './Roles';
import Settings from './Settings';
import Signup from './Signup';
import Task from './Task';
import Tasks from './Tasks';
import Users from './Users';

const App = ({ isLoggedIn, theme, darkMode, organization, user }) => {

  // Renders different routers depending on application state.
  // Particularly, is user logged in? Has organization been fully onboarded?

  useEffect(() => {
    const APP_ID = process.env.REACT_APP_INTERCOM_APP_ID

    if (isLoggedIn) {
      window.Intercom("boot", {
        app_id: APP_ID,
        user_id: user.id,
        user_hash: user.intercom_hash,
        phone: (user.phone) ? user.phone : '',
        name: `${user.first_name} ${user.last_name}`, // Full name
        email: user.email, // Email address
        created_at: user.date_joined, // Signup date as a Unix timestamp,
        company: {
          company_id: organization.id,
          created_at: organization.created,
          name: organization.name
        }
      });
    } else {
      window.Intercom("boot", {
        app_id: APP_ID
      });
    }
  }, [isLoggedIn, organization, user]);

  

  const onboardComplete = (user.onboard_complete && organization.onboard_complete) || false

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
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/signup/?email=adfasd" />
            <Route exact path="/forgot" component={Forgot} />
            <Route exact path="/forgotsuccess" component={ForgotSuccess} />
            <Route exact path="/reset/:uid/:token" component={ForgotReset} />
            <Route exact path="/resetsuccess" component={ForgotResetSuccess} />
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
  user: state.user.user
});

export default  withRouter( connect(mapStateToProps)(App) )