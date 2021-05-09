import { Button, Box } from 'grommet';
import { Google } from 'grommet-icons';
import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import config from '../config';
import { loginWithGoogle } from '../features/auth/authSlice';
import { flattenErrors, loginUser } from '../utils';
import Message from './Message';


const GoogleLoginButton = () => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState(false)

  const icon = <Google color="plain" />

  const onSuccess = async (res) => {
    const resultAction = await dispatch(loginWithGoogle(res.code))
    if(loginWithGoogle.fulfilled.match(resultAction)) {
      loginUser(resultAction.payload.user, resultAction.payload.key)
    } else {
      console.log(resultAction.payload)
      if (resultAction.payload) {
        setErrors(flattenErrors(resultAction.payload))
      } else {
        setErrors({'non_field_errors': resultAction.error.message})
      }
    }
  }

  const onFailure = (res) => {
    console.log(res);
  }

  return (
    <Box gap="medium" fill="horizontal">
    {(errors && <Message size="medium" type="error" message={errors['non_field_errors']} />)}
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
    </Box>
  )
}

export default GoogleLoginButton;
