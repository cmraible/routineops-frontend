import { Box, DataTable, ThemeContext } from 'grommet';
import React from 'react';
import WeekViewCell from './WeekViewCell';
import { DateTime, Interval } from 'luxon';



const WeekView = ({ workingDays, interval, data }) => {

  // adjust this for your exact needs
  function* days(interval) {
    let cursor = interval.start.startOf("day");
    while (cursor < interval.end) {
      yield cursor;
      cursor = cursor.plus({ days: 1 });
    }
  }

  const dates = Array.from(days(interval));

  const columns = [
    {
      property: 'key',
      primary: true,
      header: (<Box pad="small">Routines</Box>),
      render: (instance) => (<Box pad="small" style={{whiteSpace: 'nowrap'}}>{(instance && instance.routine) ? instance.routine.name : ''}</Box>)
    },
    // {
    //   property: 'role',
    //   header: (<Box pad="small">Roles</Box>),
    //   render: (instance) => (<Box pad="small">{(instance && instance.role) ? instance.role.name :  ''}</Box>)
    // },
    // {
    //   property: 'assignee',
    //   header: (<Box pad="small">Assignees</Box>),
    //   render: (instance) => (<Box pad="small">{(instance && instance.assignee) ? instance.assignee.first_name + " " + instance.assignee.last_name : '' }</Box>)
    // },
    ...dates.map((date) => {
      const interval = Interval.fromDateTimes(date.startOf('day'), date.endOf('day'))
      return {
        key: date.toFormat('EEE'),
        align: "center",
        property: date.toFormat('EEE'),
        header: <Box pad="small">{date.toFormat('EEEEE')}</Box>,
        render: (instance) => {
          const tasks = instance.instances.filter((instance) => interval.contains(DateTime.fromISO(instance.due)) )
          return (<WeekViewCell date={date} instances={tasks} />)
        },
      }

    })
  ]

  console.log(data);

  return (
    <Box fill>
      <ThemeContext.Extend
        value={{
          global: { colors: { "placeholder": "#444444" }},
          table: {
            header: { border: "gray" },
            body: { border: "gray" }
          }
        }}
      >
        <DataTable
          columns={columns}
          data={data}
          primaryKey="key"
          pad="none"
        />
      </ThemeContext.Extend>
    </Box>
  )

};

export default WeekView;
