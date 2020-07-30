import { toDate } from 'date-fns';
import { Box, Tab, Tabs } from 'grommet';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRoles } from '../actions/role.actions.js';
import { getTasks } from '../actions/task.actions.js';
import { getTaskInstances } from '../actions/taskInstance.actions';
import { getTaskLayers } from '../actions/taskLayer.actions';
import { getAllTaskLayers } from '../reducers/reducers';
import { getAllTaskInstances } from '../reducers/reducers.js';
import WeekView from '../components/WeekView.js';
import Page from '../components/Page';

const Calendar = ({ getTaskLayers, getTaskInstances, getTasks, getRoles, organization, taskLayers, taskInstances, roles, tasks }) => {

  useEffect(() => {
    getTaskLayers()
    getTasks()
    getTaskInstances()
    getRoles()
  }, [getRoles, getTaskLayers, getTasks, getTaskInstances]);

  const today = toDate(new Date())

  return (
    <Page title="Calendar">
      <Box flex={false}>
        <Tabs alignControls="start">
          <Tab title="Week">
            <WeekView date={today} taskLayers={taskLayers} taskInstances={taskInstances} tasks={tasks} roles={roles} organization={organization} />
          </Tab>
        </Tabs>
      </Box>
    </Page>
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
