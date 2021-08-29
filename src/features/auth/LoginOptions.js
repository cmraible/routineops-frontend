import { push } from 'connected-react-router';
import {
  Box,
  Button
} from 'grommet';
import { Mail } from 'grommet-icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccountPage from '../../components/AccountPage';
import GoogleLoginButton from '../../components/GoogleLoginButton';

const LoginOptions = () => {

  const dispatch = useDispatch();
  const pathname = useSelector(state => state.router.location.pathname);
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
      </Box>


    </AccountPage>
  )
}

export default LoginOptions;
