import React from 'react';
import { connect } from 'react-redux';
import { Main, Tabs, Tab } from 'grommet';
import { toDate } from 'date-fns';
import WeekView from './WeekView.js';
import MonthView from './MonthView.js';
import { getAllRoles, getAllTasks, getAllTaskLayers } from '../reducers/reducers';




const Calendar = ({ organization }) => {

  const today = toDate(new Date())

  return (
    <Main direction="column" fill margin={{bottom:"large"}}>
      <Tabs alignControls="start">
        <Tab title="Week">
          <WeekView date={today} />
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
  user: state.user,
  tasks: getAllTasks(state),
  taskLayers: getAllTaskLayers(state),
  roles: getAllRoles(state)
});

export default connect(mapStateToProps)(Calendar);
