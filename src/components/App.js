import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Box  } from 'grommet';
import { Grommet } from 'grommet';
import Kamishibai from './Kamishibai.js';
import TaskList from './TaskList.js';
import Login from './Login.js';
import Signup from './Signup.js';
import Dashboard from './Dashboard.js';
import AddTask from './AddTask.js';
import Profile from './Profile.js';
import Roles from './Roles.js';
import LandingPage from './LandingPage.js';
import Organization from './Organization.js';
import { connect } from 'react-redux'
import { login } from '../actions/actions';
import { toggleDarkMode } from '../actions/ui.actions';
import operationallyTheme from '../operationallyTheme.js';
import IconHeader from './IconHeader.js';
import IconFooter from './IconFooter.js';



const App = ({ isLoggedIn, theme, darkMode, header, footer, login }) => {

  if (isLoggedIn) {
    return (
      <Grommet theme={theme} full themeMode={ darkMode ? "dark" : "light" }>
        <Switch>
          <Box align="start" direction="column" fill="horizontal" overflow="auto">
              { header }
              <Route path="/addtask" component={AddTask} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/grid" component={Kamishibai} />
              <Route path="/list" component={TaskList} />
              <Route path="/organization" component={Organization} />
              <Route path="/profile" component={Profile} />
              <Route path="/roles" component={Roles} />
              { footer}
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

const mapStateToProps = state => {
  const header = <IconHeader />
  const footer = <IconFooter />
  return {
    darkMode: state.darkMode,
    theme: operationallyTheme,
    header: header,
    footer: footer,
    isLoggedIn: state.isLoggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleDarkMode: () => {
      dispatch(toggleDarkMode())
    },
    login: (username, password) => {
      dispatch(login(username, password))
    }
  }
}

export default  withRouter( connect(mapStateToProps, mapDispatchToProps)(App) )
