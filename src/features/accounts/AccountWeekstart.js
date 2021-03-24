import { Box, Form, FormField, Select } from 'grommet';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Modal from '../../components/Modal';
import SubmitButton from '../../components/SubmitButton';
import { flattenErrors, weekdays } from '../../utils';
import { selectUserAccount, updateAccount } from './accountsSlice';


const AccountWeekstart = ({close}) => {
  const dispatch = useDispatch()
  const account = useSelector(selectUserAccount);

  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState(undefined);
  const [value, setValue] = useState({
    id: account.id,
    wkst: (account.wkst) ? account.wkst : 0,
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
    <Modal title="Weekstart" close={close}>
        <Form
          onSubmit={handleSubmit}
          value={value}
          onChange={ nextValue => setValue(nextValue) }
          errors={errors}
          data-cy="weekstart-form"
        >
          <Box width="large" pad="medium">
            {(errors && errors['non_field_errors'] && <Message
              type="error"
              message={errors['non_field_errors']}
            />)}
            <FormField name="wkst" label="Weekstart">
              <Select
                children={(option, index, options, state) => (<Box pad="small">{weekdays[option]}</Box>)}
                name='wkst'
                options={[0,1,2,3,4,5,6]}
                labelKey={(option) => weekdays[option]}
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

export default AccountWeekstart;
