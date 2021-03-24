import {
  Anchor,
  Box,
  Button
} from 'grommet';
import { Mail } from 'grommet-icons';
import React from 'react';
import AccountPage from '../../components/AccountPage';
import GoogleLoginButton from '../../components/GoogleLoginButton';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';

const LoginOptions = () => {

  const dispatch = useDispatch();
  const pathname = useSelector(state => state.router.location.pathname);
  console.log(pathname)
  if (pathname !== '/') {
    dispatch(push('/'));
  }

  return (
    <AccountPage title="Login">
      <Box gap="large">
        <Box gap="medium" justify="center" align="center" width="350px">
            <Button
                fill="horizontal"
                size="large"
                icon={<Mail />}
                label="Sign in with Email"
                gap="large"
                onClick={() => dispatch(push('/login/email'))}
            />
            <GoogleLoginButton />
        </Box>
        <Box direction="row" justify="center" gap="small">
          <Anchor href="/signup" size="small">Sign up for Routine Ops</Anchor>
        </Box>
      </Box>


    </AccountPage>
  )
}

export default LoginOptions;
