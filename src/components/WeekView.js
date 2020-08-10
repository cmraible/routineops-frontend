import { Box, DataTable, Select, ThemeContext } from 'grommet';
import React, { useState } from 'react';
import WeekViewCell from './WeekViewCell';
import { groups } from 'd3-array';
import { DateTime, Interval } from 'luxon';



const WeekView = ({ workingDays, interval, taskInstances, tasksById, rolesById, usersById, taskLayersById, roles, tasks, users }) => {

  // adjust this for your exact needs
  function* days(interval) {
    let cursor = interval.start.startOf("day");
    while (cursor < interval.end) {
      yield cursor;
      cursor = cursor.plus({ days: 1 });
    }
  }

  const [roleFilters, setRoleFilters] = useState([])
  const [taskFilters, setTaskFilters] = useState([])
  const [assigneeFilters, setAssigneeFilters] = useState([])
  console.log(roleFilters);
  console.log(taskFilters);
  console.log(assigneeFilters);

  const dates = Array.from(days(interval));

  const layers = groups(taskInstances, d => `${d.taskLayer}|${d.assignee}`)

  const data = layers.map((layer) => {
    const instances = layer[1]
    const instance = instances[0]
    const taskLayer = taskLayersById[instance.taskLayer]
    return {
      key: layer[0],
      role: taskLayer.role,
      task: taskLayer.task,
      assignee: instance.assignee,
      instances: instances
    }
  }).filter((instance) => {
    if (roleFilters.length > 0) {
      return roleFilters.some((role) => instance.role === role)
    } else {
      return true
    }
  })
  .filter((instance) => {
    if (taskFilters.length > 0) {
      return taskFilters.some((task) => instance.task === task)
    } else {
      return true
    }
  })
  .filter((instance) => {
    if (assigneeFilters.length > 0) {
      return assigneeFilters.some((assignee) => instance.assignee === assignee)
    } else {
      return true
    }
  });

  const columns = [
    {
      header: (
        <Select 
          options={tasks} 
          placeholder="Tasks" 
          labelKey="name" 
          plain
          multiple
          value={taskFilters}
          onChange={({value, option}) => setTaskFilters(value)}
          valueKey={{
            key: 'id',
            reduce: true
          }}
        />
      ),
      render: (instance) => (<Box wrap={false} pad="small">{tasksById[instance.task].name}</Box>)
    },
    {
      primary: true,
      header: (
        <Select 
          options={roles} 
          placeholder="Roles" 
          labelKey="name" 
          plain 
          multiple
          value={roleFilters}
          onChange={({value, option}) => setRoleFilters(value)}
          valueKey={{
            key: 'id',
            reduce: true
          }}
        />),
      render: (instance) => (<Box pad="small">{rolesById[instance.role].name}</Box>)
    },
    {
      header: (
        <Select 
          options={users} 
          placeholder="Assignees" 
          labelKey={(user) => (user) ? user.first_name + " " + user.last_name : ''} 
          plain
          multiple
          value={assigneeFilters}
          onChange={({value, option}) => setAssigneeFilters(value)}
          valueKey={{
            key: 'id',
            reduce: true
          }}
        />
      ),
      render: (instance) => (<Box wrap={false} pad="small">{usersById[instance.assignee].first_name + " " + usersById[instance.assignee].last_name}</Box>)
    },
    ...dates.map((date) => {
      const interval = Interval.fromDateTimes(date.startOf('day'), date.endOf('day'))
      return {
        align: "center",
        property: date.toFormat('EEE'),
        header: <Box pad="small">{date.toFormat('EEEEE')}</Box>,
        render: (instance) => {
          const taskInstances = instance.instances.filter((instance) => interval.contains(DateTime.fromISO(instance.due)) )
          return (<WeekViewCell date={date} instances={taskInstances} />)
        },
      }

    })
  ]

  return (
    <Box fill>
      <ThemeContext.Extend 
        value={{
          global: {
            colors: {
              "placeholder": "#444444"
            }
          },
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
          primary="key"
          pad="none"
        />
      </ThemeContext.Extend>
      
    </Box>
  )

};

export default WeekView;
