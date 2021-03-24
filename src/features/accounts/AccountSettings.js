import { Box, CheckBox, Heading } from 'grommet';
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
      <Box pad="medium" width="large">
        <Heading level={2}>User Interface Settings</Heading>
          <CheckBox
            data-cy="dark-mode-toggle"
            toggle
            label={darkLabel}
            onChange={() => dispatch(toggleDarkMode())}
            checked={darkMode}
          />
        <Heading level={2}>Calendar Settings</Heading>
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
      </Box>
      {(workingDays && <AccountWorkingDays close={() => setWorkingDays(false)} />)}
      {(weekstart && <AccountWeekstart close={() => setWeekstart(false)} />)}

    </>
  )
};

export default AccountSettings;
