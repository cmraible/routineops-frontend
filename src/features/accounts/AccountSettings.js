import { Box, Card, CardBody, CardHeader, CheckBox, Heading } from 'grommet';
import { Moon, Sun } from 'grommet-icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditDescription from '../../components/EditDescription';
import { weekdays, weekday_objs } from '../../utils';
import { toggleDarkMode } from '../ui/uiSlice';
import { selectUserAccount } from './accountsSlice';
import AccountWeekstart from './AccountWeekstart';
import AccountWorkingDays from './AccountWorkingDays';


const AccountSettings = () => {
  const dispatch = useDispatch()
  const account = useSelector(selectUserAccount);
  const darkMode = useSelector(state => state.ui.darkMode)

  const [weekstart, setWeekstart] = useState(false);
  const [workingDays, setWorkingDays] = useState(false);

  const workingDaysDesc = account.working_days.map((day) => weekday_objs[day].weekday[0]).join(',')

  let darkLabel
  if (darkMode) {
    darkLabel = <Box direction="row" gap="small"><Moon /> Dark Mode On</Box>
  } else {
    darkLabel = <Box direction="row" gap="small"><Sun /> Dark Mode Off</Box>
  }

  return (
    <>
      <Box pad="medium" fill="horizontal" gap="medium">
        <Card elevation="none" border="border">
          <CardHeader pad="small">
            <Heading level={3} margin="none">User Interface Settings</Heading>
          </CardHeader>
          <CardBody pad="small" background="background-contrast">
            <CheckBox
              data-cy="dark-mode-toggle"
              toggle
              label={darkLabel}
              onChange={() => dispatch(toggleDarkMode())}
              checked={darkMode}
            />
          </CardBody>
        </Card>
        <Card elevation="none" border="border">
          <CardHeader pad="small">        
            <Heading level={3} margin="none">Calendar Settings</Heading>
          </CardHeader>
          <CardBody pad="small" background="background-contrast">
            <EditDescription
              title="Weekstart"
              description={weekdays[account.wkst]}
              onClick={() => setWeekstart(true)}
            />
            <EditDescription
              title="Working Days"
              description={workingDaysDesc}
              onClick={() => setWorkingDays(true)}
            />
          </CardBody>
        </Card>
        
      </Box>
      {(workingDays && <AccountWorkingDays close={() => setWorkingDays(false)} />)}
      {(weekstart && <AccountWeekstart close={() => setWeekstart(false)} />)}
    </>
  )
};

export default AccountSettings;
