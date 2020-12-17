import React, { useState } from 'react';
import { Box, Button, CheckBoxGroup, Form, FormField, Heading, Select, Text } from 'grommet'
import { useDispatch, useSelector } from 'react-redux';
import { weekdays, weekday_objs } from '../utils';
import { selectUserAccount, updateAccount } from '../features/accounts/accountsSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const AccountCalendarSettings = () => {
  const dispatch = useDispatch();
  const account = useSelector(selectUserAccount);

  const [requestStatus, setRequestStatus] = useState('idle')
  const [error, setError] = useState(undefined)

  const [ value, setValue] = useState({
    id: account.id,
    wkst: (account.wkst) ? account.wkst : 0,
    working_days: (account.working_days) ? account.working_days: []
  });

  const handleSubmit = async ({value}) => {
    try {
      setRequestStatus('pending');
      const resultAction = await dispatch(updateAccount(value));
      unwrapResult(resultAction)
      setRequestStatus('succeeded')
    } catch (err) {
      setRequestStatus('failed')
      setError(err)
    }
  }

  return (
  <Box flex={false}>
    <Heading margin="none" level={2}>Calendar Settings</Heading>
    <Text color="status-critical">{error}</Text>
      <Form
        onSubmit={handleSubmit}
        value={value}
        onChange={ nextValue => setValue(nextValue) }
      >
        <FormField label="Weekstart">
          <Select
            children={(option, index, options, state) => (<Box pad="small">{weekdays[option]}</Box>)}
            name='wkst'
            options={[0,1,2,3,4,5,6]}
            labelKey={(option) => weekdays[option]}
          />
        </FormField>
        <FormField label="Working Days">
          <CheckBoxGroup
            name='working_days'
            options={weekday_objs}
            labelKey='weekday'
            valueKey='index'
          />
        </FormField>
        <Button
          label="Save"
          primary
          size="large"
          type="submit"
          pad="small"
          disabled={requestStatus === 'pending'} />
      </Form>
    </Box>
  )
};

export default AccountCalendarSettings;
