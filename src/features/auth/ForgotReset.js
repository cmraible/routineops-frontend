import { Anchor, Box, Form, Text } from 'grommet';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from './authSlice';
import SubmitButton from '../../components/SubmitButton';
import PasswordField from '../../components/PasswordField';
import AccountPage from '../../components/AccountPage';
import Error from '../../components/Error';
import { flattenErrors } from '../../utils';

const ForgotReset = ({ match }) => {
  const dispatch = useDispatch()

  const [requestStatus, setRequestStatus] = useState('idle')
  const [errors, setErrors] = useState({});

  const { uid, token } = match.params

  const canSubmit = (value) => {
    if (value.new_password1 !== value.new_password2) {
      setErrors({'non_field_errors': 'Passwords do not match.'})
      return false
    }
    return true
  }

  const handleSubmit = async ({value}) => {
    if (canSubmit(value)) {
      setRequestStatus('pending');
      setErrors({});
      const resultAction =  await dispatch(resetPassword({
        uid: uid,
        token: token,
        new_password1: value.new_password1,
        new_password2: value.new_password2
      }));
      console.log(resultAction)
      if (resetPassword.fulfilled.match(resultAction)) {
        setRequestStatus('succeeded');
      } else {
        setRequestStatus('failed');
        if (resultAction.payload) {
          setErrors(flattenErrors(resultAction.payload));
        } else {
          setErrors({ 'non_field_errors': resultAction.error.message });
        }
      }
    }
  }

  let content

  if (requestStatus === 'succeeded') {
    content = (
      <Box border={true} round={true} pad="medium" gap="medium">
        <Text>Your password has been reset.</Text>
        <Text><Anchor href="/login">Click here to login.</Anchor></Text>
      </Box>
    )
  } else {
    content = (
      <Form
        onSubmit={handleSubmit}
        errors={errors}
      >
        <Box flex={false} gap="large">
          <PasswordField autoFocus name="new_password1" label="Create password" />
          <PasswordField name="new_password2" label="Confirm password" validate={false}/>
          <SubmitButton label="Reset Password" loadingIndicator={requestStatus === 'pending'} />
          <Box direction="row" justify="center" gap="small">
            <Anchor href="/login" size="small">Back to Login</Anchor>
            {/* <Text>{'\u2022'}</Text>
            <Anchor href="/signup" size="small">Sign up for Routine Ops</Anchor> */}
          </Box>
        </Box>
      </Form>
    )
  }

  return (
    <AccountPage title="Reset Password">
      <Error message={(errors && errors['non_field_errors']) ? errors['non_field_errors'] : undefined} />
      <Error message={(errors && (errors['token'] || errors['uid'])) ? 'Invalid reset link.' : undefined} />
      { content }
    </AccountPage>
  )
}

export default ForgotReset;
