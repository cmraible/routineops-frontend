import { Box, Form, FormField, Text, TextInput } from 'grommet';
import { StatusGood } from 'grommet-icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CancelButton from '../../components/CancelButton';
import Modal from '../../components/Modal';
import Error from '../../components/Error';
import SubmitButton from '../../components/SubmitButton';
import { flattenErrors } from '../../utils';
import { updateAccount, selectUserAccount } from './accountsSlice';


const AccountProfileName = ({close}) => {

  const dispatch = useDispatch()
  const account = useSelector(selectUserAccount)
  const [value, setValue] = useState({
    id: account.id,
    name: account.name
  })
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  const handleSubmit = async () => {
    setStatus('pending')
    setErrors({})
    const resultAction = await dispatch(updateAccount(value))
    if (updateAccount.fulfilled.match(resultAction)) {
      setStatus('success');
      setTimeout(() => close(), 1500)
    } else {
      setStatus('failed')
      console.log(resultAction)
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
      <Box direction="row" gap="medium" round="small" pad="medium" background={{color: "status-ok", opacity: "weak"}}>
          <StatusGood color="status-ok" /><Text>Account Name successfully updated.</Text>
      </Box>
    )
  } else {
    content = (
        <Form
          value={value}
          onChange={nextValue => setValue(nextValue)}
          onSubmit={handleSubmit}
          errors={errors}
          data-cy="name-form"
        >
          <Box direction="row-responsive" gap="medium" fill="horizontal" pad="small">
            <Error message={(errors && errors['non_field_errors']) ? errors['non_field_errors'] : undefined } />
            <FormField fill name="name" label="Account Name">
              <TextInput autoFocus name="name" />
            </FormField>
          </Box>

          <Box pad="small" background="background-contrast" justify="end" gap="large" direction="row">
            <CancelButton onClick={close} />
            <SubmitButton label="Update" loadingIndicator={status === 'pending'} />
          </Box>
        </Form>
    )
  }
  return (
    <Modal title="Edit Name" close={close}>
      <Box width="large">
      {content}
      </Box>
    </Modal>
  )
};

export default AccountProfileName;
