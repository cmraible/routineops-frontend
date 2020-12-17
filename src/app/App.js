import { Grommet } from 'grommet';
import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import defaultTheme from '../defaultTheme';
import { selectIsLoggedIn } from '../features/auth/authSlice';
import AppLoggedIn from './AppLoggedIn';
import AppLoggedOut from './AppLoggedOut';

const App = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const theme = defaultTheme
  const darkMode = useSelector(state => state.ui.darkMode)

  let app

  if (isLoggedIn) {
    app = <AppLoggedIn />
  } else {
    app = <AppLoggedOut />
  }

  return (
    <Grommet theme={theme} id="grommet" full themeMode={ darkMode ? "dark" : "light" }>
        { app }
    </Grommet>
  )
};

export default  withRouter(App)