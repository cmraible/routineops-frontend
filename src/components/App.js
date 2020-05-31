import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Box , Main } from 'grommet';
import Kamishibai from './Kamishibai.js';
import TaskList from './TaskList.js';
import IconSidebar from './IconSidebar.js';
import Login from './Login.js';
import Dashboard from './Dashboard.js';
import AddTask from './AddTask.js';
import Profile from './Profile.js';
import LandingPage from './LandingPage.js';
import Organization from './Organization.js';


const App = () => {
  if (window.localStorage.getItem('operationally.token') !== null) {
    return (
      <Switch>
        <Box align="start" direction="row" fill="true" overflow="auto">
          <IconSidebar />
            <Route path="/add">
              <AddTask />
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
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/organization">
              <Organization />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
        </Box>
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Box align="start" direction="row" fill="true" overflow="auto">
          <Main align="stretch">
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Main>
        </Box>
      </Switch>
    )
  }



};
export default App;
