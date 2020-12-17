import React, { useState } from 'react';
import { Box, Button, Form, Heading, FormField, TextInput,  } from 'grommet'
import { useDispatch, useSelector } from 'react-redux';
import { selectUserAccount, updateAccount } from '../features/accounts/accountsSlice';
import { unwrapResult } from '@reduxjs/toolkit'

const AccountContactInfo = () => {
  const dispatch = useDispatch()
  const account = useSelector(selectUserAccount)
  const [requestStatus, setRequestStatus] = useState()

  const [ value, setValue] = useState({
    id: account.id,
    name: (account.name) ? account.name : '',
    address1: (account.address1) ? account.address1 : '',
    address2: (account.address2) ? account.address2 : '',
    city: (account.city) ? account.city : '',
    state: (account.state) ? account.state : '',
    zip: (account.zip) ? account.zip : '',
  });

    const handleSubmit = async ({value}) => {
      try {
        setRequestStatus('pending')
        const resultAction = await dispatch(updateAccount(value))
        unwrapResult(resultAction)
        setRequestStatus('succeeded')
      } catch (err) {
        setRequestStatus('failed')
        console.log(err)
      }
    }

    return (
    <Box flex={false}>
      <Heading margin="none" level={2}>Contact Info</Heading>
          <Form
            onSubmit={handleSubmit}
            value={value}
            onChange={ nextValue => setValue(nextValue) }
          >
            <FormField label="Account Name">
              <TextInput name="name" />
            </FormField>
          <Button
            label="Save"
            primary
            size="large"
            type="submit"
            pad="small"
            disabled={requestStatus === 'pending'}
          />
        </Form>
      </Box>
    )
};

export default AccountContactInfo;