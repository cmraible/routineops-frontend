import { Anchor, Box, Form, Text } from 'grommet';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPasswordRequest } from './authSlice';
import SubmitButton from '../../components/SubmitButton';
import AccountPage from '../../components/AccountPage';
import EmailField from '../../components/EmailField';
import Error from '../../components/Error';
import { flattenErrors } from '../../utils';

const Forgot = () => {
  const dispatch = useDispatch()
  const [requestStatus, setRequestStatus] = useState('idle')
  const [errors, setErrors] = useState(undefined);

  const handleSubmit = async ({value}) => {
      setRequestStatus('pending');
      setErrors(undefined);
      const resultAction = await dispatch(resetPasswordRequest(value.email));
      if (resetPasswordRequest.fulfilled.match(resultAction)) {
        setRequestStatus('succeeded');
      } else {
        setRequestStatus('failed');
        if (resultAction.payload) {
          // Request completed successfully but returned field errors
          setErrors(flattenErrors(resultAction.payload))
        } else {
          // Request failed for unknown reason. Show the message.
          setErrors({'non_field_errors': resultAction.error.message})
        }
      }
  }

  let content

  if (requestStatus === 'succeeded') {
    content = (
      <Box border={true} round={true} pad="medium" gap="medium">
        <Text>Great. If an account matches that email address, you should receive a reset link in a few minutes.</Text>
        <Text>Back to <Anchor href="/login">login</Anchor>?</Text>
      </Box>
    )
  } else {
    content = (
        <Form
          onSubmit={handleSubmit}
          validate="blur"
          errors={errors}
        >
          <Box flex={false} gap="large">
            <EmailField autoFocus required={true} info="Enter your email address above to request a password reset link." />
            <SubmitButton loadingIndicator={requestStatus === 'pending'} />
            <Box direction="row" justify="center" gap="small">
              <Anchor href="/login" size="small">Back to Login</Anchor>
            </Box>
          </Box>
        </Form>
    )
  }

  return (
    <AccountPage title="Forgot your password?">
      <Error message={(errors && errors['non_field_errors']) ? errors['non_field_errors'] : undefined} />
      {content}
    </AccountPage>
  )
}

export default Forgot;
