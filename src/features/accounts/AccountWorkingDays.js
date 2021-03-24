import { Box, CheckBoxGroup, Form, FormField } from 'grommet';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Modal from '../../components/Modal';
import SubmitButton from '../../components/SubmitButton';
import { flattenErrors, weekday_objs } from '../../utils';
import { selectUserAccount, updateAccount } from './accountsSlice';


const AccountWorkingDays = ({close}) => {
  const dispatch = useDispatch()
  const account = useSelector(selectUserAccount);

  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState(undefined);
  const [value, setValue] = useState({
    id: account.id,
    working_days: (account.working_days) ? account.working_days: []
  });

  const handleSubmit = async ({value}) => {
    setStatus('pending');
    setErrors({});
    const resultAction = await dispatch(updateAccount(value));
    if (updateAccount.fulfilled.match(resultAction)) {
      setStatus('succeeded');
      close();
    } else {
      setStatus('failed')
      if (resultAction.payload) {
        setErrors(flattenErrors(resultAction.payload))
      } else {
        setErrors({'non_field_errors': resultAction.error.message})
      }
    }
  }
  return (
      <Modal title="Working Days" close={close}>
          <Form
            onSubmit={handleSubmit}
            value={value}
            onChange={ nextValue => setValue(nextValue) }
            errors={errors}
            data-cy="working-days-form"
          >
            <Box width="large" pad="medium">
              {(errors && errors['non_field_errors'] && <Message
                type="error"
                message={errors['non_field_errors']}
              />)}
              <FormField name="working_days" label="Working Days">
                <CheckBoxGroup
                  name='working_days'
                  options={weekday_objs}
                  labelKey='weekday'
                  valueKey='index'
                />
              </FormField>
            </Box>
            <Box
                gap="large"
                direction="row"
                background="background-contrast"
                pad="small"
            >
                <SubmitButton fill="horizontal" label="Save" loadingIndicator={status==='pending'}/>
            </Box>
          </Form>
      </Modal>
  )
};

export default AccountWorkingDays;
