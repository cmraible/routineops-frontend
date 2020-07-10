import { eachDayOfInterval, endOfMonth, getDay, startOfMonth } from 'date-fns';
import { Box, DataTable } from 'grommet';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTaskLayers } from '../actions/taskLayer.actions';
import { getAllTaskLayers } from '../reducers/reducers';



const YearView = ({ organization, taskLayers, tasks, roles, date }) => {

  useEffect(() => {
    getTaskLayers(organization.id)
  }, [organization.id]);

  // object to map monday based to sunday based weekdays
  const weekdayMapping = {
      0: 1, // Monday
      1: 2, // Tuesday
      2: 3, // Wednesday
      3: 4, // Thursday
      4: 5, // Friday
      5: 6, // Saturday
      6: 0  // Sunday
  }
  const monthStart = startOfMonth(date)
  const monthEnd = endOfMonth(date)
  const monthInterval = {start: monthStart, end: monthEnd}
  const workingDays = organization.working_days
  const datesInInterval = eachDayOfInterval(monthInterval)
  const workingDatesInInterval = datesInInterval.filter((datum) => {
    return workingDays.some((workingDay) => weekdayMapping[workingDay] === getDay(datum))
  })
  console.log(datesInInterval)
  console.log(workingDatesInInterval)

  const columns = [
    {
      align: 'start',
      property: 'Task',
      header: <Box pad="small">Task</Box>,
      render: datum => (<Box pad="small">{tasks[datum.task].name}</Box>)
    },
    {
      align: 'start',
      property: 'Role',
      header: <Box pad="small">Role</Box>,
      render: datum => (<Box pad="small">{roles[datum.role].name}</Box>)
    },
    {
      align: 'start',
      property: 'Year',
      header: <Box pad="small">Yearly Chart</Box>,
      render: datum => (<Box pad="small"></Box>)
    }
  ]

  return (
    <Box fill>
      <DataTable
        border={true}
        columns={columns}
        data={taskLayers}
        pad={{body: false}}
      />
    </Box>
  )

};

const mapStateToProps = state => ({
  organization: state.organization,
  user: state.user,
  tasks: state.tasks.byId,
  taskLayers: getAllTaskLayers(state),
  roles: state.roles.byId
});

const mapDispatchToProps = dispatch => ({
  getTaskLayers: () => {
    dispatch(getTaskLayers())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(YearView);
