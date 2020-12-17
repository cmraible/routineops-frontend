import {
  Anchor,
  Box,
  Button
} from 'grommet';
import { Mail } from 'grommet-icons';
import React from 'react';
import AccountPage from '../../components/AccountPage';
import GoogleLoginButton from '../../components/GoogleLoginButton';
import history from '../../history';


const LoginOptions = () => {

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
                onClick={() => history.push('/login/email')}
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
