import { eachDayOfInterval, endOfMonth, format, getDay, isSameDay, startOfMonth } from 'date-fns';
import { Box, DataTable, Text } from 'grommet';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTaskLayers } from '../actions/taskLayer.actions';
import { getAllRoles, getAllTaskLayers } from '../reducers/reducers';
import MonthViewCell from './MonthViewCell';



const MonthView = ({ organization, taskLayers, tasks, roles, date }) => {

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

  const roleColumns = roles.map((role) => {

    return {
      align: 'center',
      header: <Text>{role.name}</Text>,
      key: date,
      render: datum => {
        return <MonthViewCell date={datum} role={role} status="undefined" />
      }
    }
  })

  const columns = [
    {
      align: 'center',
      property: 'Day',
      header: <Box pad="small">Day</Box>,
      render: datum => {
        const active = isSameDay(datum, date)
        return (active) ? <Text size="large" color="accent-1" as="u">{format(datum, 'd')}</Text> : <Text size="large">{format(datum, 'd')}</Text> ;
      }
    },
    ...roleColumns
  ]

  return (
    <Box fill>
      <DataTable
        border={true}
        columns={columns}
        data={workingDatesInInterval}
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
  roles: getAllRoles(state)
});

const mapDispatchToProps = dispatch => ({
  getTaskLayers: () => {
    dispatch(getTaskLayers())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthView);
