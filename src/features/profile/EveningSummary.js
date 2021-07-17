import { Box, Form, FormField, TextInput } from 'grommet';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Modal from '../../components/Modal';
import SubmitButton from '../../components/SubmitButton';
import { flattenErrors } from '../../utils';
import { selectLoggedInUser } from '../auth/authSlice';
import { updateUser } from '../users/usersSlice';


const AccountEveningSummary = ({close}) => {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser);

  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState(undefined);
  const [value, setValue] = useState({
    id: user.id,
    send_evening_summary: (user.send_evening_summary) ? user.send_evening_summary : '',
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
          data-cy="send-evening-summary-form"
        >
          <Box width="large" pad="medium">
            {(errors && errors['non_field_errors'] && <Message
              type="error"
              message={errors['non_field_errors']}
            />)}
            <FormField name="send_evening_summary" label="Send Evening Summary at">
              <TextInput type="time" name="send_evening_summary" />
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

export default AccountEveningSummary;
