import { Box, Form, FormField, Heading, Text, TextInput } from 'grommet';
import { StatusGood } from 'grommet-icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CancelButton from '../../components/CancelButton';
import Modal from '../../components/Modal';
import SubmitButton from '../../components/SubmitButton';
import { flattenErrors } from '../../utils';
import { selectLoggedInUser } from '../auth/authSlice';
import { updateUser } from '../users/usersSlice';


const AccountCreditCard = ({close}) => {

  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)
  const [value, setValue] = useState({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name
  })
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  const handleSubmit = async () => {
    setStatus('pending')
    setErrors({})
    const resultAction = await dispatch(updateUser(value))
    if (updateUser.fulfilled.match(resultAction)) {
      setStatus('success');
      setTimeout(() => close(), 1500)
    } else {
      setStatus('failed')
      if (resultAction.payload) {
        setErrors(flattenErrors(resultAction.payload))
      } else {
        setErrors({'non_field_errors': resultAction.error.message})
      }
    }
  }

  let content
  if (status === 'success') {
    content = (
      <Box direction="row" gap="medium" margin="medium" round="small" pad="small" background={{color: "status-ok", opacity: "weak"}}>
          <StatusGood color="status-ok" /><Text>Name successfully updated.</Text>
      </Box>
    )
  } else {
    content = (
        <Form
          value={value}
          onChange={nextValue => setValue(nextValue)}
          onSubmit={handleSubmit}
          errors={errors}
        >
          <Box direction="row" gap="medium" fill="horizontal">
            <FormField fill name="first_name" label="First Name">
              <TextInput autoFocus name="first_name" />
            </FormField>
            <FormField fill name="last_name" label="Last Name">
              <TextInput name="last_name" />
            </FormField>
          </Box>

          <Box justify="end" gap="large" direction="row">
            <CancelButton onClick={close} />
            <SubmitButton label="Update" loadingIndicator={status === 'pending'} />
          </Box>
        </Form>
    )
  }
  return (
    <Modal close={close}>
      <Heading margin="none" textAlign="center" fill level={2} size="small">Edit Name</Heading>
      {content}
    </Modal>
  )
};

export default AccountCreditCard;
