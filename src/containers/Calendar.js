import { Box, Button, Text } from 'grommet';
import { Next, Previous } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getRoles } from '../actions/role.actions';
import { getUsers } from '../actions/user.actions';
import { getTasks } from '../actions/task.actions';
import { getTaskInstances } from '../actions/taskInstance.actions';
import { getTaskLayers } from '../actions/taskLayer.actions';
import { getAllTaskLayers, getLoggedInUser, getAllTaskInstances, getAllTasks, getAllRoles, getAllUsers } from '../reducers/reducers';
import WeekView from '../components/WeekView';
import Page from '../components/Page';
import { DateTime, Interval } from 'luxon';

const Calendar = ({ organization, getTaskLayers, getTaskInstances, getTasks, getRoles, taskLayers, taskInstances, taskLayersById, rolesById, tasksById, roles, usersById, tasks, getUsers, users }) => {

  useEffect(() => {
    getTaskLayers()
    getTasks()
    getTaskInstances()
    getRoles()
    getUsers()
  }, [getRoles, getTaskLayers, getTasks, getTaskInstances, getUsers]);

  // Get today's date and set as the current date
  const today = DateTime.local()
  const [date, setDate] = useState(today.plus({days: 1}))
  const interval = Interval.fromDateTimes(date.startOf('week'), date.endOf('week'))

  // Functions for previous/next buttons
  const previousWeek = () => setDate(date.minus({weeks: 1}))
  const nextWeek = () => setDate(date.plus({weeks: 1}))

  // Filter instances to those within the interval
  const instances = taskInstances.filter((instance) => interval.contains(DateTime.fromISO(instance.due)))

  return (
    <Page title="Calendar">
      <Box direction="row" align="center" justify="end">
        <Button icon={(<Previous />)} onClick={previousWeek} />
        <Text>{interval.start.toFormat('LLL d, yyyy')}</Text>
        <Button icon={(<Next />)} onClick={nextWeek} />
      </Box>
      <Box flex={false} direction="row">
        <WeekView
          interval={interval}
          usersById={usersById}
          taskLayersById={taskLayersById}
          dates={interval.start}
          workingDays={organization.working_days}
          taskInstances={instances}
          tasksById={tasksById}
          rolesById={rolesById}
          roles={roles}
          tasks={tasks}
          users={users}
        />
      </Box>
    </Page>
  )

};

const mapStateToProps = state => ({
  organization: state.organization.organization,
  roles: getAllRoles(state),
  tasks: getAllTasks(state),
  rolesById: state.roles.byId,
  tasksById: state.tasks.byId,
  taskLayers: getAllTaskLayers(state),
  taskLayersById: state.taskLayers.byId,
  taskInstances: getAllTaskInstances(state),
  user: getLoggedInUser(state),
  users: getAllUsers(state),
  usersById: state.users.byId
});

export default connect(mapStateToProps, {getTaskLayers, getTaskInstances, getRoles, getTasks, getUsers})(Calendar);
