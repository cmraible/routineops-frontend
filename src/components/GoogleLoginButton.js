import { Button } from 'grommet';
import { Google } from 'grommet-icons';
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import config from '../config';
import { loginWithGoogle } from '../features/auth/authSlice';

const GoogleLoginButton = () => {
  const dispatch = useDispatch();

  const icon = <Google color="plain" />

  const onSuccess = (res) => {
    console.log(res);
    dispatch(loginWithGoogle(res.code))
  }

  const onFailure = (res) => {
    console.log(res);
  }

  return (
    <GoogleLogin
      clientId={config.googleClientId}
      render={(props) => (
        <Button
          onClick={props.onClick}
          disabled={props.disabled}
          icon={icon}
          fill="horizontal"
          label="Sign in with Google"
          gap="large"
          size="large"
        />
      )}
      onSuccess={onSuccess}
      onFailure={onFailure}
      accessType="offline"
      responseType="code"
    />
  )
}

export default GoogleLoginButton;
