import { Box, Form, Text } from 'grommet';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmailField from '../../components/EmailField';
import Error from '../../components/Error';
import Modal from '../../components/Modal';
import SubmitButton from '../../components/SubmitButton';
import Success from '../../components/Success';
import { flattenErrors } from '../../utils';
import { selectLoggedInUser } from '../auth/authSlice';
import { addNewInvitation } from '../invitations/invitationsSlice';
import RoleSelect from '../roles/RoleSelect';

const AddUser = ( { close } ) => {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)
  const account = user.account;

  useEffect(() => {
    const title = "Invite User"
    document.title = title;
    window.analytics.page(title);
    // Code commented out when Intercom was removed
    // window.analytics.ready(() => {
    //   // if (window.innerWidth < 768) {
    //   //   window.Intercom('update', {
    //   //     "hide_default_launcher": true
    //   //   })
    //   // } else {
    //   //   window.Intercom('update', {
    //   //     "hide_default_launcher": false
    //   //   })
    //   // }
    // });
  }, []);

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
      roles: value.roles
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
    <Modal
      title="Invite User" close={close}
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
          <RoleSelect multiple title="Roles" placeholder=" " name="roles" />
          <SubmitButton label="Send Invitation" loadingIndicator={requestStatus === 'pending'} />
        </Form>
      </Box>
    </Modal>
  )

};

export default AddUser;
