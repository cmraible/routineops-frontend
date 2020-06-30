import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Box  } from 'grommet';
import { Grommet } from 'grommet';
import Calendar from './Calendar.js';
import Login from './Login.js';
import Signup from './Signup.js';
import Dashboard from './Dashboard.js';
import Tasks from './Tasks.js';
import TaskMatrix from './TaskMatrix.js';
import Profile from './Profile.js';
import Roles from './Roles.js';
import LandingPage from './LandingPage.js';
import Organization from './Organization.js';
import { connect } from 'react-redux'
import operationallyTheme from '../operationallyTheme.js';
import IconHeader from './IconHeader.js';
import IconFooter from './IconFooter.js';



const App = ({ isLoggedIn, theme, darkMode }) => {

  if (isLoggedIn) {
    return (
      <Grommet theme={theme} full themeMode={ darkMode ? "dark" : "light" }>
        <Switch>
          <Box align="start" direction="column" fill="horizontal" overflow="auto">
              <IconHeader />
              <Route path="/calendar" component={Calendar} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/matrix" component={TaskMatrix} />
              <Route path="/organization" component={Organization} />
              <Route path="/profile" component={Profile} />
              <Route path="/roles" component={Roles} />
              <Route path="/tasks" component={Tasks} />
              <IconFooter />
          </Box>
        </Switch>
      </Grommet>
    )
  } else {
    return (
      <Grommet theme={theme} full themeMode={ darkMode ? "dark" : "light" }>
        <Switch>
          <Box align="start" direction="row" fill overflow="auto">
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
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
