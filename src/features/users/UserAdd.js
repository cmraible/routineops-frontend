import { Box, Form, Text } from 'grommet';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmailField from '../../components/EmailField';
import Error from '../../components/Error';
import Page from '../../components/Page';
import SubmitButton from '../../components/SubmitButton';
import Success from '../../components/Success';
import { flattenErrors } from '../../utils';
import { selectLoggedInUser } from '../auth/authSlice';
import { addNewInvitation } from '../invitations/invitationsSlice';

const AddUser = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)
  const account = user.account;

  const [requestStatus, setRequestStatus] = useState('idle')
  const [success, setSuccess] = useState(undefined)
  const [errors, setErrors] = useState({})
  const [value, setValue] = useState({
    email_address: ''
  });

  const handleSubmit = async ({value}) => {
    setRequestStatus('pending');
    setErrors({});
    const resultAction = await dispatch(addNewInvitation({
      account: account,
      sender: user.id,
      email_address: value.email_address,
    }));
    if (resultAction.type === 'invitations/addNewInvitation/fulfilled') {
      setSuccess(resultAction.payload);
      setRequestStatus('succeeded');
      setValue({email_address: ''});
    } else {
      setRequestStatus('failed')
      if (resultAction.payload) {
        setErrors(flattenErrors(resultAction.payload))
      } else {
        setErrors({'non_field_errors': resultAction.error.message})
      }
    }
  }



  return (
    <Page
      title="Invite User"
      previous="/team"
    >
      <Box flex={false} gap="medium" width="large" pad="small">
        <Error message={(errors && errors['non_field_errors']) ? errors['non_field_errors'] : undefined } />
        <Success message={(requestStatus === 'succeeded') ? `Invite successfully sent to ${success.email_address}.` : undefined } />
        <Box border={true} round={true} pad="small" gap="small">
          <Text>{'\u2022'} You can invite anyone to join your team.</Text>
          <Text>{'\u2022'} They will receive an invite link in their email.</Text>
        </Box>
        <Form
          id="user-add-form"
          validate="blur"
          value={value}
          onChange={nextValue => setValue(nextValue)}
          onSubmit={handleSubmit}
          errors={errors}
        >
          <EmailField name="email_address" required />
          <SubmitButton label="Send Invitation" loadingIndicator={requestStatus === 'pending'} />
        </Form>
      </Box>
    </Page>
  )

};

export default AddUser;