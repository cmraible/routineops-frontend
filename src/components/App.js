import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Box , Main } from 'grommet';
import { Grommet } from 'grommet';
import Kamishibai from './Kamishibai.js';
import TaskList from './TaskList.js';
import Login from './Login.js';
import Signup from './Signup.js';
import Dashboard from './Dashboard.js';
import AddTask from './AddTask.js';
import Profile from './Profile.js';
import LandingPage from './LandingPage.js';
import Organization from './Organization.js';


const App = ({ isLoggedIn, theme, darkMode, header, footer, login }) => {


  if (isLoggedIn) {
    return (
        <Grommet theme={theme} full themeMode={ darkMode ? "dark" : "light" }>
          <Switch>
            <Box align="start" direction="column" fill overflow="auto">
              { header }
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
export default App;
