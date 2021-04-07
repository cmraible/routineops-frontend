import { Box, Form, FormField, TextInput } from 'grommet';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmailField from '../../components/EmailField';
import Error from '../../components/Error';
import Page from '../../components/Page';
import Spinner from '../../components/Spinner';
import SubmitButton from '../../components/SubmitButton';
import { flattenErrors } from '../../utils';
import { fetchUser, selectUserById, updateUser } from './usersSlice';
import { push } from 'connected-react-router';


const UserEdit = ({ match, onClose }) => {
  const dispatch = useDispatch()
  const userId = parseInt(match.params.userId);
  const user = useSelector(state => selectUserById(state, userId));

  const [fetchStatus, setFetchStatus] = useState('idle');
  const [fetchErrors, setFetchErrors] = useState({});

  useEffect(() => {
    const fetch = async () => {
      setFetchStatus('pending');
      setFetchErrors({});
      const resultAction = await dispatch(fetchUser(userId));
      if (fetchUser.fulfilled.match(resultAction)) {
        setFetchStatus('succeeded')
      } else {
        setFetchStatus('failed');
        setFetchErrors({'non_field_errors': resultAction.error.message})
      }
    }
    fetch();
  }, [dispatch, userId]);

  const [value, setValue] = useState({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email
  });
  const [requestStatus, setRequestStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const handleSubmit = async ({ value }) => {
    setRequestStatus('pending');
    setErrors({});
    const resultAction = await dispatch(updateUser(value));
    if (updateUser.fulfilled.match(resultAction)) {
      setRequestStatus('succeeded');
      dispatch(push(`/users/${userId}`));
    } else {
      setRequestStatus('failed');
      if (resultAction.payload) {
        setErrors(flattenErrors(resultAction.payload))
      } else {
        setErrors({'non_field_errors': resultAction.error.message})
      }
    }
  }

  let content;

  if (fetchStatus === 'pending') {
    content = (<Spinner pad="large" size="large" color="status-unknown" />)
  } else if (fetchStatus === 'succeeded') {
    content = (
      <Box pad="medium">
        <Error message={(errors && errors['non_field_errors']) ? errors['non_field_errors'] : undefined} />
        <Form
          id="user-form"
          onSubmit={handleSubmit}
          value={value}
          onChange={ nextValue => setValue(nextValue)}
          errors={errors}
        >
          <FormField label="First Name" name="first_name">
            <TextInput name="first_name" />
          </FormField>
          <FormField label="Last Name" name="last_name">
            <TextInput name="last_name" />
          </FormField>
          <EmailField />
          <SubmitButton label="Save" loadingIndicator={requestStatus === 'pending'} />
        </Form>
      </Box>
    )
  } else if (fetchStatus === 'failed') {
    content = (<Error message={(fetchErrors && fetchErrors['non_field_errors']) ? fetchErrors['non_field_errors'] : undefined} />)
  }


  return (
    <Page
      title="Edit User"
      previous={`/users/${userId}`}
      pad="small"
    >
      {content}
    </Page>
  )
};

export default UserEdit;
