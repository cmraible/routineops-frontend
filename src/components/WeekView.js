import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, Table, TableHeader, TableRow, TableCell, TableBody, ThemeContext } from 'grommet';
import { format, eachDayOfInterval, getDay, endOfWeek, startOfWeek } from 'date-fns';
import { getTaskInstances } from '../actions/taskInstance.actions';
import WeekViewCell from './WeekViewCell';
import { getAllTaskLayers } from '../reducers/reducers';
import { rrulestr } from 'rrule';
import { getAllTaskInstances } from '../reducers/reducers'



const WeekView = ({ getTaskInstances, organization, tasks, taskInstances, taskLayers, roles, date }) => {

  useEffect(() => {
    getTaskInstances(organization.id)
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

  return (
    <Box fill>
      <ThemeContext.Extend 
        value={{
          table: {
            header: {
              border: "gray"
            },
            body: {
              border: "gray"
            }
          }
        }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Role</TableCell>
              {
                workingDatesInInterval.map(date => <TableCell align="center">{format(date, 'EEEEE')}</TableCell>)
              }
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              taskLayers.map(taskLayer => (
                <TableRow>
                  <TableCell>{tasks[taskLayer.task].name}</TableCell>
                  <TableCell>{roles[taskLayer.role].name}</TableCell>
                  {
                    workingDatesInInterval.map(date => {
                      const recurrence = rrulestr(taskLayer.recurrence)
                      return (<WeekViewCell taskLayer={taskLayer} date={date} />)
                    })
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </ThemeContext.Extend>
      
    </Box>
  )

};

const mapStateToProps = state => ({
  organization: state.organization,
  user: state.user,
  tasks: state.tasks.byId,
  taskLayers: getAllTaskLayers(state),
  taskInstances: getAllTaskInstances(state),
  roles: state.roles.byId
});

const mapDispatchToProps = dispatch => ({
  getTaskInstances: () => {
    dispatch(getTaskInstances())
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WeekView);
