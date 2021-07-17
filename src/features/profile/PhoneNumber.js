import { Box, Form, FormField, Text, TextInput } from 'grommet';
import { StatusGood } from 'grommet-icons';
import React, { useState } from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from '../auth/authSlice';
import { fetchUser, updateUserPhone, verifyUserPhone } from '../users/usersSlice';
import { flattenErrors } from '../../utils';
import CancelButton from '../../components/CancelButton';
import Modal from '../../components/Modal';
import './PhoneNumber.css';
import SubmitButton from '../../components/SubmitButton';
import Error from '../../components/Error';


const PhoneNumberModal = ({ close }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser)

  const [phonenumber, setPhonenumber] = useState();
  const [verifyCode, setVerifyCode] = useState();
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({})

  const validatePhone = () => {
    if (!isValidPhoneNumber(phonenumber)) {
      return 'Enter a valid phone number.'
    }
  }

  const validateCode = () => {
    if (verifyCode.code.length !== 6) {
      return 'Invalid code.'
    }
  }


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
    console.log(data)
    setErrors({})
    setStatus('verify_pending')
    const resultAction = await dispatch(verifyUserPhone(data))
    if (verifyUserPhone.fulfilled.match(resultAction)) {
      setStatus('success');
      dispatch(fetchUser(user.id))
      setTimeout(() => {
        close()
      }, 1500)
    } else {
      setStatus('verify_failed');
      console.log(resultAction)
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
        <Form
          onSubmit={handleUpdatePhone}
          errors={errors}
          data-cy="mobile-number-form"
        >
          <Box pad="small">
            <Box gap="medium">
              <Error message={(errors && errors['non_field_errors']) ? errors['non_field_errors'] : undefined } />
              <FormField
                pad={true}
                validate={validatePhone}
                name="phone"
              >
                <PhoneInput value={phonenumber} onChange={setPhonenumber} defaultCountry="US" />
              </FormField>
            </Box>
          </Box>
          <Box
            justify="end"
            gap="large"
            direction="row"
            background="background-contrast"
            pad="small"
          >
              <CancelButton onClick={close} />
              <SubmitButton label="Update" loadingIndicator={status === 'update_pending'} />
            </Box>
        </Form>
      </>
    )
  } else if (status === 'verify' || status === 'verify_pending' || status === 'verify_failed') {
    content = (
      <>
        <Form
          value={verifyCode}
          onChange={nextValue => setVerifyCode(nextValue)}
          onSubmit={handleVerifyPhone}
          errors={errors}
          data-cy="verify-phone-code"
        >
          <Box gap="medium">
            <Error message={(errors && errors['non_field_errors']) ? errors['non_field_errors'] : undefined } />
            <FormField label="Six Digit Code" name="code" validate={validateCode}>
              <TextInput type="number" autoFocus name="code" placeholder="XXXXXX" />
            </FormField>
          </Box>

          <Box
            justify="end"
            gap="large"
            direction="row"
            pad="small"
            background="background-contrast"
          >
              <CancelButton onClick={close} />
              <SubmitButton label="Verify" loadingIndicator={status === 'verify_pending'} />
            </Box>
        </Form>
      </>
    )
  } else {
    content = (
      <>
      <Box direction="row" gap="medium" round="small" pad="medium" background={{color: "status-ok", opacity: "weak"}}>
          <StatusGood color="status-ok" /><Text>Phone number updated successfully!</Text>
      </Box>
      </>
    )
  }

  return (
    <Modal title="Mobile Number" close={close}>
      {content}
    </Modal>
  )

};

export default PhoneNumberModal;
