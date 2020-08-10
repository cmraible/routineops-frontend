import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, DataTable, Select } from 'grommet';
import { Checkmark, Close } from 'grommet-icons';
import Page from '../components/Page';
import { getRoles } from '../actions/role.actions';
import { getUsers } from '../actions/user.actions';
import { getTasks } from '../actions/task.actions';
import { getTaskInstances } from '../actions/taskInstance.actions';
import { getTaskLayers } from '../actions/taskLayer.actions';
import { getLoggedInUser, getAllTaskInstances, getAllTasks, getAllRoles, getAllUsers } from '../reducers/reducers';
import { DateTime, Interval } from 'luxon';



const Dashboard = ({usersById, taskLayersById, rolesById, tasksById, getUsers, getTaskLayers, getTasks, getTaskInstances, getRoles, taskInstances, tasks, roles, users}) => {

  useEffect(() => {
    getUsers()
    getTaskLayers()
    getTasks()
    getTaskInstances()
    getRoles()
  }, [getRoles, getTaskLayers, getTasks, getTaskInstances, getUsers]);


  // Setup state for filters
  const today = DateTime.local()
  const intervals = [
    {
      id: 0,
      label: 'This Week',
      interval: Interval.fromDateTimes(today.startOf('week'), today.endOf('week'))
    },
    {
      id: 1,
      label: 'Last Week',
      interval: Interval.fromDateTimes(today.minus({weeks: 1}).startOf('week'), today.minus({weeks: 1}).endOf('week'))
    },
    {
      id: 2,
      label: 'Last 7 days',
      interval: Interval.fromDateTimes(today.minus({days: 7}), today)
    },
    {
      id: 3,
      label: 'Last 30 days',
      interval: Interval.fromDateTimes(today.minus({days: 30}), today)
    },
    {
      id: 4,
      label: 'Last 60 days',
      interval: Interval.fromDateTimes(today.minus({days: 60}), today)
    }, 
    {
      id: 5,
      label: 'Last 90 days',
      interval: Interval.fromDateTimes(today.minus({days: 90}), today)
    }
  ]
  const [roleFilters, setRoleFilters] = useState([]);
  const [taskFilters, setTaskFilters] = useState([]);
  const [assigneeFilters, setAssigneeFilters] = useState([]);
  const [interval, setInterval] = useState(0);

  // Filter instances to the current interval
  const instances = taskInstances
    .filter((instance) => intervals.find((i) => i.id === interval).interval.contains(DateTime.fromISO(instance.due)));

  // Flatten data
  const data = instances.map((instance) => {
    const taskLayer = taskLayersById[instance.taskLayer]
    return {
      id: instance.id,
      role: rolesById[taskLayer.role],
      task: tasksById[taskLayer.task],
      assignee: usersById[instance.assignee],
      due: DateTime.fromISO(instance.due),
      completed: (instance.completed) ? DateTime.fromISO(instance.completed) : ''
    }
  });

  // Filter according to user selected filters
  const filteredData = data
    .filter((instance) => {
      if (roleFilters.length > 0) {
        return roleFilters.some((role) => instance.role.id === role)
      } else {
        return true
      }
    })
    .filter((instance) => {
      if (taskFilters.length > 0) {
        return taskFilters.some((task) => instance.task.id === task)
      } else {
        return true
      }
    })
    .filter((instance) => {
      if (assigneeFilters.length > 0) {
        return assigneeFilters.some((assignee) => instance.assignee.id === assignee)
      } else {
        return true
      }
    })
    .sort((a, b) => a.due - b.due); 


    const columns = [
      {
        property: "id",
        primary: true,
        header: (<Box pad="small">Task</Box>),
        render: (instance) => (<Box pad="small">{ (instance && instance.task) ? instance.task.name : '' }</Box>)
      },
      {
        property: "assignee",
        header: (<Box pad="small">Assignee</Box>),
        render: (instance) => (<Box pad="small">{ (instance && instance.assignee) ? instance.assignee.first_name + " " + instance.assignee.last_name : '' }</Box>)
      },
      {
        property: "due",
        header: (<Box pad="small">Due Date</Box>),
        render: (instance) => (<Box pad="small">{ (instance && instance.due) ? instance.due.toFormat('MM/dd/yyyy') : '' }</Box>)
      },
      {
        property: "completed",
        header: (<Box pad="small">Status</Box>),
        render: (instance) => (<Box pad="small">{ (instance.completed) ? <Checkmark /> : <Close /> }</Box>)
      },

    ]

  return (
    <Page title="Dashboard">
      <Box direction="row-responsive" justify="between" align="center" flex={false} fill={false}>
          <Select
            options={intervals}
            placeholder="Interval"
            labelKey="label"
            plain
            value={interval}
            onChange={({value}) => setInterval(value)}
            valueKey={{
              key: 'id',
              reduce: true
            }}
          />
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
          />
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
      </Box>
      <Box direction="row-responsive" gap="medium" fill="horizontal">
        <DataTable 
          data={filteredData}
          columns={columns}
          primaryKey="id"
        />
      </Box>
    </Page>
  )
};


const mapStateToProps = state => ({
  organization: state.organization.organization,
  user: getLoggedInUser(state),
  tasks: getAllTasks(state),
  roles: getAllRoles(state),
  users: getAllUsers(state),
  taskInstances: getAllTaskInstances(state),
  taskLayersById: state.taskLayers.byId,
  rolesById: state.roles.byId,
  tasksById: state.tasks.byId,
  usersById: state.users.byId
})

export default connect(mapStateToProps, {
  getTaskLayers, 
  getTaskInstances, 
  getRoles, 
  getTasks, 
  getUsers
})(Dashboard);