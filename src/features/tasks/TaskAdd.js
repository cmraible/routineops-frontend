import { Box, Button, Form, Text } from 'grommet';
import { Checkmark } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/Error';
import FrequencySelect from '../../components/FrequencySelect';
import HourMultipleSelect from '../../components/HourMultipleSelect';
import InlineInput from '../../components/InlineInput';
import InlineTextArea from '../../components/InlineTextArea';
import MonthDayMultipleSelect from '../../components/MonthDayMultipleSelect';
import MonthMultipleSelect from '../../components/MonthMultipleSelect';
import Page from '../../components/Page';
import SubmitButton from '../../components/SubmitButton';
import TimeMaskedInput from '../../components/TimeMaskedInput';
import WeekdayMultipleSelect from '../../components/WeekdayMultipleSelect';
import { flattenErrors, getDefaultTaskLayer } from '../../utils';
import { fetchAccount, selectUserAccount } from '../accounts/accountsSlice';
import { selectLoggedInUser } from '../auth/authSlice';
import RoleSelect from '../roles/RoleSelect';
import { fetchRoles, selectRoleIds } from '../roles/rolesSlice';
import { addNewTask } from '../tasks/tasksSlice';
import { push, goBack } from 'connected-react-router';


const AddTask = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser)
  const roles = useSelector(selectRoleIds);
  const account = useSelector(selectUserAccount);

  const defaultRole = account.type === 'Free' ? roles[0] : '';

  useEffect(() => {
    dispatch(fetchAccount(user.account));
    dispatch(fetchRoles());
  }, [dispatch, user.account]);

  const [requestStatus, setRequestStatus] = useState('idle');
  const [errors, setErrors] = useState({})
  const [formValue, setFormValue] = useState({
    name: '',
    description: '',
    account: user.account,
    bymonthday: [],
    bymonth: [],
    role: defaultRole
  });

  const handleSubmit = async () => {
    const taskData = {
        name: formValue.name,
        description: formValue.description,
        account: user.account,
        checks: [{prompt: `Did you ${formValue.name}?`, resultType: 'BOOLEAN', account: user.account}],
        layers: [
          {
            account: user.account,
            role: formValue.role,
            label: formValue.label,
            frequency: formValue.frequency,
            recurrence: formValue.recurrence,
            interval: formValue.interval,
            dtstart: formValue.dtstart,
            byhour: formValue.byhour,
            time: formValue.time,
            byweekday: formValue.byweekday,
            bymonthday: formValue.bymonthday,
            bymonth: formValue.bymonth,
          }
        ]
    }
    setRequestStatus('pending');
    setErrors({});
    const resultAction = await dispatch(addNewTask(taskData))
    if (addNewTask.fulfilled.match(resultAction)) {
      setRequestStatus('succeeded');
      dispatch(push('/tasks'));
    } else {
      setRequestStatus('failed');
      if (resultAction.payload) {
        setErrors(flattenErrors(resultAction.payload));
      } else {
        setErrors({'non_field_errors': `Unable to add task: ${resultAction.error.message}`});
      }
    }
  }

  console.log(formValue)


  return (
    <Page
      title="Add Task"
      previous={() => dispatch(goBack())}
      action={{
        icon: <Checkmark />,
        type: "submit",
        form: "task-form"
      }}
    >
      <Box
        width="large"
        pad="medium"
        margin="medium"
        round="small"
        alignSelf="center"
        background="background-contrast"
        animation={{type: "slideUp", size: "small", duration: 200}}>
        <Error message={(errors && errors['non_field_errors']) ? errors['non_field_errors'] : undefined } />
        <Form
          id='task-form'
          errors={errors}
          value={formValue}
          onChange={ nextValue => setFormValue(nextValue) }
          onSubmit={handleSubmit}
        >
            <Box>
              <InlineInput autoFocus name="name" placeholder="Task Name" size="xxlarge" required />
              <InlineTextArea placeholder="Task Description" name="description" size="medium" />
            </Box>
            {
              account.type !== 'Free' && (
                <Box flex={false}>
                  <Box align="center" justify="stretch" gap="small" direction="row">
                    <Text style={{'whiteSpace': 'nowrap'}}>Assigned to</Text><RoleSelect placeholder="Select Role" required />
                  </Box>
                </Box>
              )
            }

            <Box flex={false} gap="medium">
              <Box align="center" justify="between" gap="small" direction="row">
                <Text>Repeats</Text><FrequencySelect onChange={({value}) => {
                  const newValue = getDefaultTaskLayer(value, account);
                  setFormValue({...formValue, ...newValue})
                }} />
              </Box>
              {formValue.label === 'Hourly' && (
                <Box align="center" justify="between" gap="small" direction="row">
                  <Text>from</Text><HourMultipleSelect value={formValue.byhour} />
                </Box>
              )}
              {['Hourly', 'Daily', 'Weekly', 'Bi-Weekly'].some((frequency) => formValue.label === frequency) && (
                <Box align="center" justify="between" gap="small" direction="row">
                  <Text>on</Text><WeekdayMultipleSelect value={formValue.byweekday} />
                </Box>
              )}
              {['Monthly', 'Yearly'].some((frequency) => formValue.label === frequency) && (
                <Box align="center" gap="small" direction="row">
                  <Text style={{'whiteSpace': 'nowrap'}}>on the</Text><MonthDayMultipleSelect value={formValue.bymonthday} /><Text style={{'whiteSpace': 'nowrap'}}>{(formValue.bymonthday.length > 1) ? 'days' : 'day'}</Text>
                </Box>
              )}
              {['Monthly', 'Yearly'].some((frequency) => formValue.label === frequency) && (
                <Box align="center" gap="small" direction="row">
                  <Text>of</Text><MonthMultipleSelect value={formValue.bymonth} />
                </Box>
              )}
              {['Daily', 'Weekly', 'Bi-Weekly'].some((frequency) => formValue.label === frequency) && (
                <Box align="center" gap="small" direction="row">
                  <Text>before</Text><TimeMaskedInput value={formValue.time} />
                </Box>
              )}
            </Box>
            <Box direction="row" justify="end" gap="large">
              <Button plain label="Cancel" onClick={() => dispatch(goBack())} />
              <SubmitButton label="Save" loadingIndicator={requestStatus === 'pending'} />
            </Box>
        </Form>
      </Box>

    </Page>
  )
};

export default AddTask;
