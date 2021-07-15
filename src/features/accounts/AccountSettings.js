import { Box, Card, CardBody, CardHeader, Heading } from 'grommet';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditDescription from '../../components/EditDescription';
import { weekdays, weekday_objs } from '../../utils';
import { selectUserAccount } from './accountsSlice';
import AccountWeekstart from './AccountWeekstart';
import AccountWorkingDays from './AccountWorkingDays';


const AccountSettings = () => {
  const account = useSelector(selectUserAccount);

  const [weekstart, setWeekstart] = useState(false);
  const [workingDays, setWorkingDays] = useState(false);

  const workingDaysDesc = account.working_days.map((day) => weekday_objs[day].weekday[0]).join(',')

  return (
    <>
      <Box pad="medium" fill="horizontal" gap="medium">
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
