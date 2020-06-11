import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Box , Main } from 'grommet';
import { Grommet } from 'grommet';
import Kamishibai from './Kamishibai.js';
import TaskList from './TaskList.js';
import Login from './Login.js';
import Signup from './Signup.js';
import Dashboard from './Dashboard.js';
import AddTaskWrapper from '../containers/AddTaskWrapper.js';
import Profile from './Profile.js';
import LandingPage from './LandingPage.js';
import Organization from './Organization.js';
import { connect } from 'react-redux'
import { toggleDarkMode, login } from '../actions'
import operationallyTheme from '../operationallyTheme.js';
import AppHeader from '../containers/AppHeader.js';
import AppFooter from '../containers/AppFooter.js';



const App = ({ isLoggedIn, theme, darkMode, header, footer, login }) => {


  if (isLoggedIn) {
    return (
        <Grommet theme={theme} full themeMode={ darkMode ? "dark" : "light" }>
          <Switch>
            <Box align="start" direction="column" fill="horizontal" overflow="auto">
              { header }
                <Route path="/add">
                  <AddTaskWrapper />
                </Route>
                <Route path="/dash">
                  <Dashboard />
                </Route>
                <Route path="/grid">
                  <Kamishibai />
                </Route>
                <Route path="/list">
                  <TaskList />
                </Route>
                <Route path="/organization">
                  <Organization />
                </Route>
                <Route path="/profile">
                  <Profile />
                </Route>
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
            <Main align="stretch">
              <Route exact path="/">
                <LandingPage />
              </Route>
              <Route path="/login">
                <Login loginFunction={login}/>
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
            </Main>
          </Box>
        </Switch>
      </Grommet>
    )
  }



};

const mapStateToProps = state => {
  const header = <AppHeader />
  const footer = <AppFooter />
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
