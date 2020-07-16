import { Box, Grommet } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import operationallyTheme from '../operationallyTheme';
import Calendar from './Calendar';
import Dashboard from './Dashboard';
import DefaultSidebar from './DefaultSidebar';
import Forgot from './Forgot';
import ForgotReset from './ForgotReset';
import ForgotResetSuccess from './ForgotResetSuccess';
import ForgotSuccess from './ForgotSuccess';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Role from './Role';
import Roles from './Roles';
import Settings from './Settings';
import Signup from './Signup';
import SignupSuccess from './SignupSuccess';
import Task from './Task';
import Tasks from './Tasks';



const App = ({ isLoggedIn, theme, darkMode }) => {

  if (isLoggedIn) {
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
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signupsuccess" component={SignupSuccess} />
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
  darkMode: state.ui.darkMode,
  theme: operationallyTheme,
  isLoggedIn: state.auth.isLoggedIn
});

export default  withRouter( connect(mapStateToProps)(App) )
