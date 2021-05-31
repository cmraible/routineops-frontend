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
import { flattenErrors, defaultLayerParams } from '../../utils';
import { fetchAccount, selectUserAccount } from '../accounts/accountsSlice';
import { selectLoggedInUser } from '../auth/authSlice';
import RoleSelect from '../roles/RoleSelect';
import { fetchRoles } from '../roles/rolesSlice';
import { fetchRoutine, updateRoutine } from './routinesSlice';
import { push } from 'connected-react-router';
import RRule from 'rrule';
import { DateTime } from 'luxon';


const RoutineEdit = ({ match, layers }) => {
  const dispatch = useDispatch()
  const { routineId } = match.params;
  const user = useSelector(selectLoggedInUser)
  const account = useSelector(selectUserAccount);

  const [value, setValue] = useState({});

  const [fetchStatus, setFetchStatus] = useState('idle');
  const [updateStatus, setUpdateStatus] = useState('idle');
  const [fetchErrors, setFetchErrors] = useState({});
  const [updateErrors, setUpdateErrors] = useState({});

  useEffect(() => {
    dispatch(fetchAccount(user.account))
    const setRoutineValue = (value) => {
      console.log(value)
      setValue({
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
      const routineAction = await dispatch(fetchRoutine(routineId));
      const roleAction = await dispatch(fetchRoles());
      if (fetchRoutine.fulfilled.match(routineAction) && fetchRoles.fulfilled.match(roleAction)) {
        setRoutineValue(routineAction.payload);
        setFetchStatus('succeeded');
      } else {
          setFetchStatus('failed');
          if (routineAction.payload) {
            setFetchErrors(flattenErrors(routineAction.payload))
          } else if (roleAction.payload) {
            setFetchErrors(flattenErrors(roleAction.payload))
          } else if (routineAction.error) {
            setFetchErrors({'non_field_errors': routineAction.error.message})
          } else if (roleAction.error) {
            setFetchErrors({'non_field_errors': roleAction.error.message})
          } else {
            setFetchErrors({'non_field_errors': 'Unable to fetch routine.'})
          }
      }
    }
    fetch();
  }, [dispatch, routineId, setValue, user.account]);

  const handleSubmit = async () => {
    const routineData = {
      id: value.id,
      name: value.name,
      description: value.description,
      account: user.account,
      checks: value.checks,
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
    const resultAction = await dispatch(updateRoutine(routineData))
    if (updateRoutine.fulfilled.match(resultAction)) {
      setUpdateStatus('succeeded');
      dispatch(push(`/routines/${routineId}`))
    } else {
      setUpdateStatus('failed')
      if (resultAction.payload) {
        setUpdateErrors(flattenErrors(resultAction.payload))
      } else {
        setUpdateErrors({'non_field_errors': resultAction.error.message})
      }
    }
  }

  const handleChange = (formValue) => {
    if (formValue.label !== value.label) {
      // user changed the frequency label
      // get the default parameters, generate rrule
      const params = defaultLayerParams(formValue.label, account)
      const rule = new RRule(params)
      setValue({
        ...value,
        name: formValue.name,
        description: formValue.description,
        label: formValue.label,
        bymonth: [],
        byweekday: [],
        byhour: [],
        ...params,
        recurrence: rule.toString(),
        frequency: params['freq'],
        time: DateTime.fromJSDate(params['dtstart']).toUTC().setZone('local', {keepLocalTime: true}).toFormat('HH:mm')
      })
    } else {
      // user did not change the frequency label
      // generate the rrule from user provided inputs
      const defaultParams = defaultLayerParams(formValue.label, account)
      let { dtstart } = defaultParams || {dtstart: null}
      if (['Daily', 'Weekly', 'Bi-Weekly'].includes(formValue.label)) {
        // Time is an input. Calculate the proper dtstart based on user input
        const hours = parseInt(formValue.time.split(':')[0])
        const minutes = parseInt(formValue.time.split(':')[1])
        dtstart = DateTime.local().set({hour: hours, minute: minutes, seconds: 0}).setZone('utc', {keepLocalTime: true}).toJSDate()
        const params = {
          ...defaultParams,
          dtstart: dtstart,
          byweekday: formValue.byweekday,
          byhour: formValue.byhour,
          bymonth: formValue.bymonth,
          bymonthday: formValue.bymonthday
        }
        const rule = new RRule(params)
        setValue({
          ...value,
          ...formValue,
          recurrence: rule.toString()
        });
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
          id="routine-form"
          value={value}
          onChange={handleChange}
          onSubmit={handleSubmit}
          errors={updateErrors}
        >
            <Box>
              <InlineInput name="name" placeholder="Routine Name" size="xxlarge" required />
              <InlineTextArea placeholder="Routine Description" name="description" size="medium" />
            </Box>
            { // Only display the Role select if the account has a team subscription
              account.type === 'Team' && (
                <Box flex={false}>
                  <Box align="center" justify="stretch" gap="small" direction="row">
                    <Text style={{'whiteSpace': 'nowrap'}}>Assigned to</Text><RoleSelect placeholder="Select Role" name="role" required plain />
                  </Box>
                </Box>
              )
            }

            <Box flex={false} gap="medium">
              <Box align="center" justify="between" gap="small" direction="row">
                <Text>Repeats</Text><FrequencySelect />
              </Box>
              { // Display the hour multiple select only if the frequency is Hourly
                value.label === 'Hourly' && (
                  <Box align="center" justify="between" gap="small" direction="row">
                    <Text>from</Text><HourMultipleSelect value={value.byhour} />
                  </Box>
                )
              }
              { // Display the Weekday select for hourly, daily, weekly, bi-weekly
                ['Hourly', 'Daily', 'Weekly', 'Bi-Weekly'].some((frequency) => value.label === frequency) && (
                  <Box align="center" justify="between" gap="small" direction="row">
                    <Text>on</Text><WeekdayMultipleSelect value={value.byweekday} />
                  </Box>
                )
              }
              { // Display the month day select for monthly and yearly
                ['Monthly', 'Yearly'].some((frequency) => value.label === frequency) && (
                  <Box align="center" gap="small" direction="row">
                    <Text style={{'whiteSpace': 'nowrap'}}>on the</Text><MonthDayMultipleSelect value={value.bymonthday} /><Text style={{'whiteSpace': 'nowrap'}}>{(value.bymonthday.length > 1) ? 'days' : 'day'}</Text>
                  </Box>
                )
              }
              { // Display the month multiple select only form monthly and yearly
                ['Monthly', 'Yearly'].some((frequency) => value.label === frequency) && (
                  <Box align="center" gap="small" direction="row">
                    <Text>of</Text><MonthMultipleSelect value={value.bymonth} />
                  </Box>
                )
              }
              { // Display the time due only for daily, weekly, bi-weekly
                ['Daily', 'Weekly', 'Bi-Weekly'].some((frequency) => value.label === frequency) && (
                  <Box align="center" gap="small" direction="row">
                    <Text>before</Text><TimeMaskedInput value={value.time} />
                  </Box>
                )
              }
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
      title="Edit Routine"
      actionn={{
        icon: <Checkmark />,
        label: "Save Routine",
        type: "submit",
        form: "routine-form"
      }}
      previous={() => dispatch(push(`/routines/${routineId}`))}
    >
      {content}
    </Page>
  )
};

export default RoutineEdit;
