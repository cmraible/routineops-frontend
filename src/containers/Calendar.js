import { Box, Button, Select, Text } from 'grommet';
import { Next, Previous } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getRoles } from '../actions/role.actions';
import { getUsers } from '../actions/user.actions';
import { getTasks } from '../actions/task.actions';
import { getTaskInstances } from '../actions/taskInstance.actions';
import { getTaskLayers } from '../actions/taskLayer.actions';
import { getAllTaskLayers, getLoggedInUser, getAllTaskInstances, getAllTasks, getAllRoles, getAllUsers } from '../reducers/reducers';
import WeekView from '../components/WeekView';
import Page from '../components/Page';
import { DateTime, Interval } from 'luxon';
import { groups } from 'd3-array';

const Calendar = ({ organization, getTaskLayers, getTaskInstances, getTasks, getRoles, taskLayers, taskInstances, taskLayersById, rolesById, tasksById, roles, usersById, tasks, getUsers, users }) => {

  useEffect(() => {
    getUsers()
    getTaskLayers()
    getTasks()
    getTaskInstances()
    getRoles()
  }, [getRoles, getTaskLayers, getTasks, getTaskInstances, getUsers]);

  // Setup state for filters
  const [roleFilters, setRoleFilters] = useState([])
  const [taskFilters, setTaskFilters] = useState([])
  const [assigneeFilters, setAssigneeFilters] = useState([])

  // Get today's date and set as the current date
  const today = DateTime.local()
  const [date, setDate] = useState(today.plus({days: 1}))
  const interval = Interval.fromDateTimes(date.startOf('week'), date.endOf('week'))

  // Functions for previous/next buttons
  const previousWeek = () => setDate(date.minus({weeks: 1}))
  const nextWeek = () => setDate(date.plus({weeks: 1}))

  // Filter instances by interval
  const instances = taskInstances
    .filter((instance) => interval.contains(DateTime.fromISO(instance.due)));

  // Group by unique key composed of taskLayer and assignee ID
  const layers = groups(instances, d => `${d.taskLayer}|${d.assignee}`)
  
  // Flatten data to represent rows for calendar view
  const data = layers.map((layer) => {
    const instances = layer[1]
    const instance = instances[0]
    const taskLayer = taskLayersById[instance.taskLayer]
    return {
      key: layer[0],
      role: rolesById[taskLayer.role],
      task: tasksById[taskLayer.task],
      assignee: usersById[instance.assignee],
      instances: instances
    }
  })

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
    }); 

  return (
    <Page title="Calendar">
      <Box direction="row-responsive" justify="between" align="center" flex={false}>
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
        
        <Box direction="row" align="center" justify="end">
          <Button icon={(<Previous />)} onClick={previousWeek} />
          <Text>{interval.start.toFormat('LLL d, yyyy')}</Text>
          <Button icon={(<Next />)} onClick={nextWeek} />
        </Box>
      </Box>
      
      <Box flex={false} direction="row">
        <WeekView
          interval={interval}
          workingDays={organization.working_days}
          data={filteredData}
        />
      </Box>
    </Page>
  )

};

const mapStateToProps = state => ({
  organization: state.organization.organization,
  roles: getAllRoles(state),
  tasks: getAllTasks(state),
  rolesById: state.roles.byId,
  tasksById: state.tasks.byId,
  taskLayers: getAllTaskLayers(state),
  taskLayersById: state.taskLayers.byId,
  taskInstances: getAllTaskInstances(state),
  user: getLoggedInUser(state),
  users: getAllUsers(state),
  usersById: state.users.byId
});

export default connect(mapStateToProps, {
  getTaskLayers, 
  getTaskInstances, 
  getRoles, 
  getTasks, 
  getUsers
})(Calendar);
