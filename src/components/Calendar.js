import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Main, Tabs, Tab } from 'grommet';
import { toDate } from 'date-fns';
import WeekView from './WeekView.js';
import MonthView from './MonthView.js';
import { getAllRoles, getAllTasks, getAllTaskLayers } from '../reducers/reducers';
import { getTaskLayers } from '../actions/taskLayer.actions'



const Calendar = ({ organization, taskLayers }) => {

  useEffect(() => {
    getTaskLayers(organization.id)
  }, [organization.id]);

  const today = toDate(new Date())

  return (
    <Main direction="column" fill margin={{bottom:"large"}}>
      <Tabs alignControls="start">
        <Tab title="Week">
          <WeekView date={today} taskLayers={taskLayers} />
        </Tab>
        <Tab title="Month">
          <MonthView date={today} />
        </Tab>
      </Tabs>
    </Main>
  )

};

const mapStateToProps = state => ({
  organization: state.organization,
  roles: getAllRoles(state),
  tasks: getAllTasks(state),
  taskLayers: getAllTaskLayers(state),
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getTaskLayers: () => {
    dispatch(getTaskLayers())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
