import { Box, Form, FormField, Select } from 'grommet';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Modal from '../../components/Modal';
import SubmitButton from '../../components/SubmitButton';
import { flattenErrors, timezones } from '../../utils';
import { selectLoggedInUser } from '../auth/authSlice';
import { updateUser } from '../users/usersSlice';


const AccountTimezone = ({close}) => {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser);

  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState(undefined);
  const [options, setOptions] = useState(timezones);
  const [value, setValue] = useState({
    id: user.id,
    timezone: (user.timezone) ? user.timezone : '',
  });

  const handleSubmit = async ({value}) => {
    setStatus('pending');
    setErrors({});
    const resultAction = await dispatch(updateUser(value));
    if (updateUser.fulfilled.match(resultAction)) {
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
    <Modal title="Timezone" close={close}>
        <Form
          onSubmit={handleSubmit}
          value={value}
          onChange={ nextValue => setValue(nextValue) }
          errors={errors}
          data-cy="timezone-form"
        >
          <Box width="large" pad="medium">
            {(errors && errors['non_field_errors'] && <Message
              type="error"
              message={errors['non_field_errors']}
            />)}
            <FormField name="timezone" label="Timezone">
              <Select
                name='timezone'
                options={options}
                onSearch={(text) => {
                  // Escape regex special characters
                  const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
                  
                  const exp = new RegExp(escapedText, 'i');
                  setOptions(timezones.filter(o => exp.test(o)));
                }}
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

export default AccountTimezone;
