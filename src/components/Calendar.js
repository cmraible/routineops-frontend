import { toDate } from 'date-fns';
import { Heading, Main, Tab, Tabs } from 'grommet';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRoles } from '../actions/role.actions.js';
import { getTaskInstances } from '../actions/taskInstance.actions';
import { getTaskLayers } from '../actions/taskLayer.actions';
import { getAllTaskLayers } from '../reducers/reducers';
import MonthView from './MonthView.js';
import WeekView from './WeekView.js';
import { getTasks } from '../actions/task.actions.js';
import { getAllTaskInstances } from '../reducers/reducers.js';



const Calendar = ({ getTaskLayers, getTaskInstances, getTasks, getRoles, organization, taskLayers, taskInstances, roles, tasks }) => {

  useEffect(() => {
    getTaskLayers(organization.id)
    getTasks(organization.id)
    getTaskInstances(organization.id)
    getRoles(organization.id)
  }, [organization.id]);

  const today = toDate(new Date())

  return (
    <Main direction="column" fill margin={{bottom:"large"}}>
      <Heading>Calendar</Heading>
      <Tabs alignControls="start">
        <Tab title="Week">
          <WeekView date={today} taskLayers={taskLayers} taskInstances={taskInstances} tasks={tasks} roles={roles} organization={organization} />
        </Tab>
        <Tab title="Month">
          <MonthView date={today} taskLayers={taskLayers} taskInstances={taskInstances} roles={roles} />
        </Tab>
      </Tabs>
    </Main>
  )

};

const mapStateToProps = state => ({
  organization: state.organization,
  roles: state.roles.byId,
  tasks: state.tasks.byId,
  taskLayers: getAllTaskLayers(state),
  taskInstances: getAllTaskInstances(state),
  user: state.user
});

export default connect(mapStateToProps, {getTaskLayers, getTaskInstances, getRoles, getTasks})(Calendar);
