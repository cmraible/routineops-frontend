import { Box, Form, FormField, TextInput, Heading, Text } from 'grommet';
import { StatusGood } from 'grommet-icons';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserPhone, verifyUserPhone, fetchUser } from '../features/users/usersSlice';
import React, { useState } from 'react';
import Modal from './Modal';
import SubmitButton from './SubmitButton';
import CancelButton from './CancelButton';
import { selectLoggedInUser } from '../features/auth/authSlice';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './PhoneNumberModal.css';
import { flattenErrors } from '../utils';


const PhoneNumberModal = ({ close }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser)

  const [phonenumber, setPhonenumber] = useState();
  const [verifyCode, setVerifyCode] = useState();
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({})


  const handleUpdatePhone = async () => {
    setStatus('update_pending')
    const resultAction = await dispatch(updateUserPhone({userId: user.id, phone: phonenumber}))
    if (updateUserPhone.fulfilled.match(resultAction)) {
      setStatus('verify')
    } else {
      setStatus('update_failed')
      if (resultAction.payload) {
        setErrors(flattenErrors(resultAction.payload))
      } else {
        setErrors({'non_field_errors': resultAction.error.message})
      }
    }
  }

  const handleVerifyPhone = async () => {
    const data = {
      userId: user.id,
      phone: phonenumber,
      code: parseInt(verifyCode.code)
    }
    setStatus('verify_pending')
    const resultAction = await dispatch(verifyUserPhone(data))
    if (verifyUserPhone.fulfilled.match(resultAction)) {
      setStatus('success');
      dispatch(fetchUser(user.id))
      setTimeout(() => {
        close()
      }, 3000)
    } else {
      setStatus('verify_failed');
      if (resultAction.payload) {
        setErrors(flattenErrors(resultAction.payload))
      } else {
        setErrors({'non_field_errors': resultAction.error.message})
      }
    }
  }

  let content
  if (status === 'idle' || status === 'update_pending' || status === 'update_failed') {
    content = (
      <>
        <Heading margin="none" textAlign="center" fill level={2} size="small">Mobile Number</Heading>
        <Form
          onSubmit={handleUpdatePhone}
          errors={errors}
        >
          <FormField pad={true}>
            <PhoneInput value={phonenumber} onChange={setPhonenumber} defaultCountry="US" />
          </FormField>
          <Box justify="end" gap="large" direction="row">
              <CancelButton onClick={close} />
              <SubmitButton label="Update" loadingIndicator={status === 'update_pending'} />
            </Box>
        </Form>
      </>
    )
  } else if (status === 'verify' || status === 'verify_pending' || status === 'verify_failed') {
    content = (
      <>
        <Heading margin="none" textAlign="center" fill level={2} size="small">Verification</Heading>
        <Form
          value={verifyCode}
          onChange={nextValue => setVerifyCode(nextValue)}
          onSubmit={handleVerifyPhone}
          errors={errors}
        >
          <FormField label="Six Digit Code" >
            <TextInput name="code" placeholder="XXXXXX" />
          </FormField>
          <Box justify="end" gap="large" direction="row">
              <CancelButton onClick={close} />
              <SubmitButton label="Verify" loadingIndicator={status === 'verify_pending'} />
            </Box>
        </Form>
      </>
    )
  } else {
    content = (
      <>
      <Heading margin="none" textAlign="center" fill level={2} size="small">Verification</Heading>
      <Box direction="row" gap="medium" margin="medium" round="small" pad="small" background={{color: "status-ok", opacity: "weak"}}>
          <StatusGood color="status-ok" /><Text>Phone number updated successfully!</Text>
      </Box>
      </>
    )
  }

  return (
    <Modal close={close}>
      {content}
    </Modal>
  )

};

export default PhoneNumberModal;
