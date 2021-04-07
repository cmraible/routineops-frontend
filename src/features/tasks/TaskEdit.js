import { Box, Form, Text } from 'grommet';
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
import Spinner from '../../components/Spinner';
import SubmitButton from '../../components/SubmitButton';
import TimeMaskedInput from '../../components/TimeMaskedInput';
import WeekdayMultipleSelect from '../../components/WeekdayMultipleSelect';
import { flattenErrors, getDefaultTaskLayer } from '../../utils';
import { fetchAccount, selectUserAccount } from '../accounts/accountsSlice';
import { selectLoggedInUser } from '../auth/authSlice';
import RoleSelect from '../roles/RoleSelect';
import { fetchRoles } from '../roles/rolesSlice';
import { fetchTask, updateTask } from './tasksSlice';
import { push } from 'connected-react-router';


const TaskEdit = ({ match, taskLayers }) => {
  const dispatch = useDispatch()
  const { taskId } = match.params;
  const user = useSelector(selectLoggedInUser)
  const account = useSelector(selectUserAccount);

  const [formValue, setFormValue] = useState({});

  const [fetchStatus, setFetchStatus] = useState('idle');
  const [updateStatus, setUpdateStatus] = useState('idle');
  const [fetchErrors, setFetchErrors] = useState({});
  const [updateErrors, setUpdateErrors] = useState({});

  useEffect(() => {
    dispatch(fetchAccount(user.account))
    const setTaskValue = (value) => {
      setFormValue({
        id: value.id,
        name: value.name,
        description: value.description,
        role: value.layers[0].role,
        label: value.layers[0].label,
        bymonthday: value.layers[0].bymonthday,
        bymonth: value.layers[0].bymonth,
        byweekday: value.layers[0].byweekday,
        interval: value.layers[0].interval,
        dtstart: value.layers[0].dtstart,
        byhour: value.layers[0].byhour,
        time: value.layers[0].time || undefined,
        layers: value.layers,
        checks: value.checks
      });
    }
    const fetch = async () => {
      setFetchStatus('pending');
      setFetchErrors({});
      const taskAction = await dispatch(fetchTask(taskId));
      const roleAction = await dispatch(fetchRoles());
      if (fetchTask.fulfilled.match(taskAction) && fetchRoles.fulfilled.match(roleAction)) {
        setTaskValue(taskAction.payload);
        setFetchStatus('succeeded');
      } else {
          setFetchStatus('failed');
          if (taskAction.payload) {
            setFetchErrors(flattenErrors(taskAction.payload))
          } else if (roleAction.payload) {
            setFetchErrors(flattenErrors(roleAction.payload))
          } else if (taskAction.error) {
            setFetchErrors({'non_field_errors': taskAction.error.message})
          } else if (roleAction.error) {
            setFetchErrors({'non_field_errors': roleAction.error.message})
          } else {
            setFetchErrors({'non_field_errors': 'Unable to fetch task.'})
          }
      }
    }
    fetch();
  }, [dispatch, taskId, setFormValue, user.account]);

  const handleSubmit = async ({value}) => {
    const taskData = {
      id: value.id,
      name: value.name,
      description: value.description,
      account: user.account,
      checks: formValue.checks,
      layers: [
        {
          id: value.layers[0].id,
          account: user.account,
          role: value.role,
          label: value.label,
          frequency: value.frequency,
          recurrence: value.recurrence,
          interval: value.interval,
          dtstart: value.dtstart,
          byhour: value.byhour,
          time: value.time,
          byweekday: value.byweekday,
          bymonthday: value.bymonthday,
          bymonth: value.bymonth,
        }
      ]
    }
    setUpdateStatus('pending');
    setUpdateErrors({});
    const resultAction = await dispatch(updateTask(taskData))
    if (updateTask.fulfilled.match(resultAction)) {
      setUpdateStatus('succeeded');
      dispatch(push(`/tasks/${taskId}`))
    } else {
      setUpdateStatus('failed')
      if (resultAction.payload) {
        setUpdateErrors(flattenErrors(resultAction.payload))
      } else {
        setUpdateErrors({'non_field_errors': resultAction.error.message})
      }
    }
  }

  let content

  if (fetchStatus === 'pending') {
    content = (<Spinner isFetching={true} pad="large" size="large" color="status-unknown" />)
  } else if (fetchStatus === 'succeeded') {
    content = (
      <Box pad="medium">
        <Error message={(updateErrors && updateErrors['non_field_errors']) ? updateErrors['non_field_errors'] : undefined} />
        <Form
          id="task-form"
          value={formValue}
          onChange={ nextValue => setFormValue(nextValue)}
          onSubmit={handleSubmit}
          errors={updateErrors}
        >
            <Box>
              <InlineInput name="name" placeholder="Task Name" size="xxlarge" required />
              <InlineTextArea placeholder="Task Description" name="description" size="medium" />
            </Box>
            <Box flex={false}>
              <Box align="center" justify="stretch" gap="small" direction="row">
                <Text style={{'whiteSpace': 'nowrap'}}>Assigned to</Text><RoleSelect placeholder="Select Role" name="role" required plain />
              </Box>
            </Box>
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
            <SubmitButton label="Save" loadingIndicator={updateStatus === 'pending'} />
        </Form>
      </Box>
    )
  } else if (fetchStatus === 'failed') {
    content = (
      <Error message={(fetchErrors && fetchErrors['non_field_errors']) ? fetchErrors['non_field_errors'] : undefined} />
    )
  }

  return (
    <Page
      pad="small"
      title="Edit Task"
      actionn={{
        icon: <Checkmark />,
        label: "Save Task",
        type: "submit",
        form: "task-form"
      }}
      previous={`/tasks/${taskId}`}
    >
      {content}
    </Page>
  )
};

export default TaskEdit;
