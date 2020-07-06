import { eachDayOfInterval, endOfWeek, format, getDay, isSameDay, parseISO, startOfWeek } from 'date-fns';
import { Box, DataTable, ThemeContext } from 'grommet';
import React from 'react';
import WeekViewCell from './WeekViewCell';



const WeekView = ({ organization, tasks, taskInstances, taskLayers, roles, date }) => {

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

  const data = taskLayers.map((layer) => {
    const role = roles[layer.role]
    const task = tasks[layer.task]
    return {
      task: (task) ? task.name : '',
      role: (role) ? role.name : '',
      id: layer.id
    }
  })

  console.log(data)

  const columns = [
    {
      property: 'task',
      header: <Box pad="small">Task</Box>,
      render: (layer) => (<Box pad="small">{layer.task}</Box>)
    },
    {
      property: 'role',
      header: <Box pad="small">Role</Box>,
      render: (layer) => (<Box pad="small">{layer.role}</Box>)

    },
    ...workingDatesInInterval.map((date) => {
      const dateInstances = (taskInstances) ? taskInstances.filter((instance) => isSameDay(date, parseISO(instance.due))) : []
      
      return {
        align: "center",
        property: format(date, 'EEE'),
        header: <Box pad="small">{format(date, 'EEEEE')}</Box>,
        render: (layer) => {
          const cellInstances = dateInstances.filter((instance) => instance.taskLayer === layer.id)
          return (<WeekViewCell taskLayer={layer} date={date} instances={cellInstances} />)
        },

      }
    })
    
  ]

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
        <DataTable 
          columns={columns}
          data={data}
          pad="none"
        />
      </ThemeContext.Extend>
      
    </Box>
  )

};

export default WeekView;
