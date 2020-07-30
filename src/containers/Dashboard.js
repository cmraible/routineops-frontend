import React from 'react';
import { connect } from 'react-redux';
import { Box, Heading, Meter, Stack, Text } from 'grommet';
import Page from '../components/Page';
import { getAllRoles, getAllTasks, getAllTaskInstances } from '../reducers/reducers';
import { DateTime } from 'luxon';



const Dashboard = ({taskInstances}) => {


  console.log(taskInstances);
  const dt = DateTime.local();
  const past = taskInstances.filter((instance) => {
    return DateTime.fromISO(instance.due) < dt
  });
  const onTime = past.filter((instance) => (DateTime.fromISO(instance.due) < DateTime.fromISO(instance.completed)) );
  const pastDue = past.filter((instance) => instance.completed === undefined);
  const onTimePercent = (onTime.length / past.length) || 100;
  const onTimeValue = {
    "value": onTimePercent,
    "color": (onTimePercent === 100) ? "status-ok" : "status-warning"
  };
  const pastDueCount = pastDue.length;
  const pastDueValue = {
    "value": 100 ,
    "color": (pastDueCount === 0) ? "status-ok" : "status-warning"
  };

  return (
    <Page title="Dashboard">
      <Box direction="row-responsive" gap="medium">
        <Box align="center">
          <Stack anchor="center">
            <Meter type="circle" size="small" round={true} max={100} values={[onTimeValue]} />
            <Box align="center">
              <Heading level={2}>{onTimeValue.value}%</Heading>
            </Box>
          </Stack>
          <Text>On Time</Text>
        </Box>
        <Box align="center">
          <Stack anchor="center">
            <Meter type="circle" size="small" round={true} max={100} values={[pastDueValue]} />
            <Box align="center">
              <Heading level={2}>{pastDueCount}</Heading>
            </Box>
          </Stack>
          <Text>Past Due</Text>
        </Box>
      </Box>
      
    </Page>
  )
};


const mapStateToProps = state => ({
  organization: state.organization.organization,
  user: state.user.user,
  tasks: getAllTasks(state),
  roles: getAllRoles(state),
  taskInstances: getAllTaskInstances(state)
})

export default connect(mapStateToProps, {})(Dashboard);