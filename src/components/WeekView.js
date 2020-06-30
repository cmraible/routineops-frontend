import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, DataTable, Text } from 'grommet';
import { format, eachDayOfInterval, isSameDay, getDay, endOfWeek, startOfWeek } from 'date-fns';
import { getTaskLayers } from '../actions/taskLayer.actions';
import WeekViewCell from './WeekViewCell';
import { getAllTaskLayers } from '../reducers/reducers';



const WeekView = ({ organization, taskLayers, tasks, roles, date }) => {

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
  const sundayWkst = weekdayMapping[organization.wkst]
  const weekStart = startOfWeek(date, {weekStartsOn: sundayWkst})
  const weekEnd = endOfWeek(date, {weekStartsOn: sundayWkst})
  const weekInterval = {start: weekStart, end: weekEnd}
  const workingDays = organization.working_days
  const datesInInterval = eachDayOfInterval(weekInterval)
  const workingDatesInInterval = datesInInterval.filter((datum) => {
    return workingDays.some((workingDay) => weekdayMapping[workingDay] === getDay(datum))
  })

  const dayColumns = workingDatesInInterval.map((workingDate) => {
    const active = isSameDay(workingDate, date)
    return {
      align: 'center',
      header: (active) ? <Text size="large" color="accent-1" as="u">{format(workingDate, 'EEEEE')}</Text> : <Text size="large">{format(workingDate, 'EEEEE')}</Text>,
      key: date,
      render: datum => (<WeekViewCell date={workingDate} taskLayer={datum} />),
      sortable: false
    }
  })

  const columns = [
    {
      align: 'start',
      property: 'Task',
      header: <Box pad="small">Task</Box>,
      render: datum => (<Box pad="small">{tasks[datum.task].name}</Box>),
    },
    {
      align: 'start',
      property: 'Role',
      header: <Box pad="small">Role</Box>,
      render: datum => (<Box pad="small">{roles[datum.role].name}</Box>)
    },
    ...dayColumns
  ]

  return (
    <Box fill>
      <DataTable
        border={true}
        columns={columns}
        data={taskLayers}
        pad={{body: false}}
        sortable={false}
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

export default connect(mapStateToProps, mapDispatchToProps)(WeekView);
