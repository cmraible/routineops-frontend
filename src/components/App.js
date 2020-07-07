import { Box, Grommet } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import operationallyTheme from '../operationallyTheme.js';
import Calendar from './Calendar.js';
import Dashboard from './Dashboard.js';
import Home from './Home.js';
import IconFooter from './IconFooter.js';
import IconHeader from './IconHeader.js';
import LandingPage from './LandingPage.js';
import Login from './Login.js';
import Profile from './Profile.js';
import Roles from './Roles.js';
import Settings from './Settings.js';
import Signup from './Signup.js';
import TaskLayers from './TaskLayers.js';
import Tasks from './Tasks.js';



const App = ({ isLoggedIn, theme, darkMode }) => {

  if (isLoggedIn) {
    return (
      <Grommet theme={theme} full themeMode={ darkMode ? "dark" : "light" }>
        <Switch>
          <Box align="start" direction="column" fill="horizontal">
              <IconHeader />
              <Route path="/" exact component={Home} />
              <Route path="/calendar" component={Calendar} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/layers" component={TaskLayers} />
              <Route path="/profile" component={Profile} />
              <Route path="/roles" component={Roles} />
              <Route path="/settings" component={Settings} />
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
            <Route  exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
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
