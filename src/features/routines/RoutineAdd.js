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
import { flattenErrors, defaultTaskLayerParams } from '../../utils';
import { fetchAccount, selectUserAccount } from '../accounts/accountsSlice';
import { selectLoggedInUser } from '../auth/authSlice';
import RoleSelect from '../roles/RoleSelect';
import { fetchRoles, selectRoleIds } from '../roles/rolesSlice';
import { addNewRoutine } from './routinessSlice';
import { push, goBack } from 'connected-react-router';
import { RRule } from 'rrule';
import { DateTime } from 'luxon';


const AddRoutine = () => {
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
  const [value, setValue] = useState({
    name: '',
    description: '',
    account: user.account,
    bymonthday: [],
    bymonth: [],
    byweekday: [],
    byhour: [],
    role: defaultRole
  });

  const handleSubmit = async () => {
    const routineData = {
        name: value.name,
        description: value.description,
        account: user.account,
        layers: [
          {
            account: user.account,
            role: value.role || defaultRole,
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
    setRequestStatus('pending');
    setErrors({});
    const resultAction = await dispatch(addNewRoutine(routineData))
    if (addNewRoutine.fulfilled.match(resultAction)) {
      setRequestStatus('succeeded');
      dispatch(push('/routines'));
    } else {
      setRequestStatus('failed');
      if (resultAction.payload) {
        setErrors(flattenErrors(resultAction.payload));
      } else {
        setErrors({'non_field_errors': `Unable to add routine: ${resultAction.error.message}`});
      }
    }
  }

  const handleChange = (formValue) => {
    if (formValue.label !== value.label) {
      // user changed the frequency label
      // get the default parameters, generate rrule
      const params = defaultTaskLayerParams(formValue.label, account)
      const rule = new RRule(params)
      setValue({
        role: formValue.role,
        name: formValue.name,
        description: formValue.description,
        label: formValue.label,
        bymonth: [],
        byweekday: [],
        byhour: [],
        ...params,
        recurrence: rule.toString(),
        frequency: params['freq'],
        time: DateTime.fromJSDate(params['dtstart']).toUTC().setZone('local', {keepLocalTime: true}).toFormat('HH:mm'),
      })
    } else {
      // user did not change the frequency label
      // generate rrule from user provided inputs
      const defaultParams = defaultTaskLayerParams(formValue.label, account)
      let { dtstart } = defaultParams || {dtstart: null}
      console.log(dtstart)
      if (['Daily', 'Weekly', 'Bi-Weekly'].includes(formValue.label)) {
        // Time is an input. Calcuate the proper dtstart based on input
        const hours = parseInt(formValue.time.split(':')[0])
        const minutes = parseInt(formValue.time.split(':')[1])
        dtstart = DateTime.local().set({hour: hours, minute: minutes, seconds: 0}).setZone('utc', {keepLocalTime: true}).toJSDate()
        console.log(hours)
        console.log(minutes)
        console.log(DateTime.local().set({hour: hours, minute: minutes, seconds: 0}).toJSDate())
      }
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
        ...formValue,
        recurrence: rule.toString()
      });
    }
  }

  useEffect(() => {
    if (value.recurrence) {
      console.groupCollapsed()
      RRule.fromString(value.recurrence).all((d, l) => l < 40).forEach((date) => {
        console.log(DateTime.fromJSDate(date).toUTC().setZone('local', {keepLocalTime: true}).toJSDate())
      })
      console.groupEnd()
    }
  }, [value.recurrence]);

  return (
    <Page
      title="Add Routine"
      previous={() => dispatch(goBack())}
      action={{
        icon: <Checkmark />,
        type: "submit",
        form: "routine-form"
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
          id='routine-form'
          errors={errors}
          value={value}
          onChange={ nextValue => handleChange(nextValue) }
          onSubmit={handleSubmit}
        >
            <Box>
              <InlineInput autoFocus name="name" placeholder="Routine Name" size="xxlarge" required />
              <InlineTextArea placeholder="Routine Description" name="description" size="medium" />
            </Box>
            { // Only display the Role select if the account has a team subscription
              account.type === 'Team' && (
                <Box flex={false}>
                  <Box align="center" justify="stretch" gap="small" direction="row">
                    <Text style={{'whiteSpace': 'nowrap'}}>Assigned to</Text><RoleSelect placeholder="Select Role" required />
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
              { // Display the Month multiple select only for monthly and yearly
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
            <Box direction="row" justify="end" gap="large">
              <Button plain label="Cancel" onClick={() => dispatch(goBack())} />
              <SubmitButton label="Save" loadingIndicator={requestStatus === 'pending'} />
            </Box>
        </Form>
      </Box>

    </Page>
  )
};

export default AddRoutine;
