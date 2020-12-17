import { Anchor, Box, Form, Text } from 'grommet';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AccountPage from '../../components/AccountPage';
import EmailField from '../../components/EmailField';
import Error from '../../components/Error';
import PasswordField from '../../components/PasswordField';
import SubmitButton from '../../components/SubmitButton';
import { flattenErrors, loginUser } from '../../utils';
import { login } from './authSlice';


const Login = () => {
  const dispatch = useDispatch()

  const [loginStatus, setLoginStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const handleSubmit = async ({value}) => {
    setLoginStatus('pending');
    setErrors({});
    const resultAction = await dispatch(login(value));
    if (login.fulfilled.match(resultAction)) {
      loginUser(resultAction.payload.user, resultAction.payload.key)
    } else {
      setLoginStatus('failed')
      if (resultAction.payload) {
        // Request completed successfully but returned field errors
        setErrors(flattenErrors(resultAction.payload))
      } else {
        // Request failed for unknown reason. Show the message.
        setErrors({'non_field_errors': resultAction.error.message})
      }
    }
  }

  return (
    <AccountPage title="Login">
      <Error message={(errors && errors['non_field_errors']) ? errors['non_field_errors'] : undefined} />
      <Form
        onSubmit={handleSubmit}
        errors={errors}
        id="login-form"
      >
        <Box flex={false} gap="large">
          <EmailField autoFocus required={true} />
          <PasswordField required={true} validate={false} />
          <SubmitButton label="Login" loadingIndicator={loginStatus === 'pending'} />
          <Box direction="row" justify="center" gap="small">
            <Anchor href="/forgot" size="small">Forgot password?</Anchor>
            <Text>{'\u2022'}</Text>
            <Anchor href="/signup" size="small">Sign up for Routine Ops</Anchor>
          </Box>
        </Box>
      </Form>
    </AccountPage>
  )
}

export default Login;
