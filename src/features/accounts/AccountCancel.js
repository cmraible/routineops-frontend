import { Box, Form, FormField, Paragraph, TextInput } from 'grommet';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CancelButton from '../../components/CancelButton';
import Message from '../../components/Message';
import Modal from '../../components/Modal';
import SubmitButton from '../../components/SubmitButton';
import { cancelSubscription } from '../subscriptions/subscriptionsSlice';
import { selectUserAccount } from './accountsSlice';

const AccountCancel = ({ close }) => {

  const dispatch = useDispatch();
  const account = useSelector(selectUserAccount)

  const [value, setValue] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const validateCancel = (value) => {
    if (value !== 'CANCEL') {
      return 'Please type the word CANCEL in all capital letters.'
    }
  }

  const handleSubmit = async () => {
    setStatus('pending')
    const resultAction = await dispatch(cancelSubscription(account.id))
    if (cancelSubscription.fulfilled.match(resultAction)) {
      setStatus('succeeded');
    } else {
      setStatus('failed');
      setErrors({'non_field_errors': 'Unable to cancel subscription at this time.'});
    }
  }

  return (
    <Modal title="Cancel Subscription" close={close}>
        <Box pad={{horizontal: "large"}} width="large">
          <Paragraph fill>Are you sure you want to cancel your subscription?</Paragraph>
          <Paragraph fill>Type CANCEL below to cancel.</Paragraph>
        </Box>
        <Form
          value={value}
          onChange={nextValue => setValue(nextValue)}
          onSubmit={handleSubmit}
          errors={errors}
          data-cy="cancel-form"
        >
          {(errors['non_field_errors'] && <Message type="error" message={errors['non_field_errors']} />)}
          <FormField name="cancel" validate={validateCancel}>
            <TextInput name="cancel" autoFocus placeholder="CANCEL"/>
          </FormField>
          <Box justify="end" gap="large" direction="row" pad="small">
            <CancelButton onClick={close} label="Close" />
            <SubmitButton loadingIndicator={status === 'pending'} color="status-critical" size="large" disabled={value.cancel !== 'CANCEL'} label="Cancel" />
          </Box>
        </Form>
    </Modal>
  )
};

export default AccountCancel;
