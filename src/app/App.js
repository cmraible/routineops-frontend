import { Grommet } from 'grommet';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Spinner from '../components/Spinner';
import defaultTheme from '../defaultTheme';
import { fetchAccount, selectUserAccount } from '../features/accounts/accountsSlice';
import { selectIsLoggedIn, selectLoggedInUser } from '../features/auth/authSlice';
import AppLoggedIn from './AppLoggedIn';
import AppLoggedOut from './AppLoggedOut';
import AppUserOnboarding from './AppUserOnboarding';


const App = () => {

  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectLoggedInUser);
  const theme = defaultTheme
  const darkMode = useSelector(state => state.ui.darkMode)
  const account = useSelector(selectUserAccount);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchAccount(user.account))
    }
  }, [dispatch, isLoggedIn, user]);

  let app

  if (isLoggedIn) {
    if (account) {
      if (user.onboard_complete) {
        app = <AppLoggedIn />
      } else {
        app = <AppUserOnboarding />
      }
    } else {
      app = <Spinner />
    }
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