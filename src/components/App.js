import { Box, Grommet } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import operationallyTheme from '../operationallyTheme';
import Calendar from './Calendar';
import Dashboard from './Dashboard';
import Home from './Home';
import IconFooter from './IconFooter';
import IconHeader from './IconHeader';
import Login from './Login';
import Profile from './Profile';
import Roles from './Roles';
import Settings from './Settings';
import Signup from './Signup';
import TaskLayers from './TaskLayers';
import Tasks from './Tasks';
import Task from './Task';



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
              <Route path="/profile" component={Profile} />
              <Route path="/roles" component={Roles} />
              <Route path="/settings" component={Settings} />
              <Route path="/tasks" component={Tasks} />
              <Route path="/task/:task_id" component={Task} />
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
