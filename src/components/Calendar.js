import { toDate } from 'date-fns';
import { Box, Heading, Main, Tab, Tabs } from 'grommet';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRoles } from '../actions/role.actions.js';
import { getTasks } from '../actions/task.actions.js';
import { getTaskInstances } from '../actions/taskInstance.actions';
import { getTaskLayers } from '../actions/taskLayer.actions';
import { getAllTaskLayers } from '../reducers/reducers';
import { getAllTaskInstances } from '../reducers/reducers.js';
import MonthView from './MonthView.js';
import WeekView from './WeekView.js';
import { Mixpanel } from '../mixpanel';



const Calendar = ({ getTaskLayers, getTaskInstances, getTasks, getRoles, organization, taskLayers, taskInstances, roles, tasks }) => {

  useEffect(() => {
    getTaskLayers()
    getTasks()
    getTaskInstances()
    getRoles()
  }, [getRoles, getTaskLayers, getTasks, getTaskInstances]);

  useEffect(() => {
    Mixpanel.track('Viewed calendar page.')
  }, []);

  const today = toDate(new Date())

  return (
    <Main pad="medium">
      <Box flex={false}>
        <Heading>Calendar</Heading>
        <Tabs alignControls="start">
          <Tab title="Week">
            <WeekView date={today} taskLayers={taskLayers} taskInstances={taskInstances} tasks={tasks} roles={roles} organization={organization} />
          </Tab>
          <Tab title="Month">
            <MonthView date={today} taskLayers={taskLayers} taskInstances={taskInstances} roles={roles} />
          </Tab>
        </Tabs>
      </Box>
    </Main>
  )

};

const mapStateToProps = state => ({
  organization: state.organization.organization,
  roles: state.roles.byId,
  tasks: state.tasks.byId,
  taskLayers: getAllTaskLayers(state),
  taskInstances: getAllTaskInstances(state),
  user: state.user.user
});

export default connect(mapStateToProps, {getTaskLayers, getTaskInstances, getRoles, getTasks})(Calendar);
