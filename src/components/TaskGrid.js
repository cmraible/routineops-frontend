import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, DataTable, Text } from 'grommet';
import { getRoles } from '../actions/role.actions';
import { getTasks } from '../actions/task.actions';



const TaskGrid = ({ organization, tasks, roles }) => {

  useEffect(() => {
    getTasks(organization.id)
    getRoles(organization.id)
  }, [organization.id]);

  const days = ['M', 'T', 'W', 'R', 'F', 'S', 'S']

  const dayColumns = days.map((day) => {
    return {
      align: 'center',
      header: <Text>{day}</Text>
    }
  })

  const columns = [
    {
      align: 'start',
      property: 'Task',
      header: <Text>Task</Text>,
      render: datum => (<Text>{datum.name}</Text>)
    },
    ...dayColumns
  ]

  return (
      <DataTable
        columns={columns}
        data={tasks}
        border={true}
      />
  )

};

const mapStateToProps = state => {
  return {
    organization: state.organization,
    user: state.user,
    tasks: state.tasks,
    roles: state.roles
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTasks: (organization_id) => {
      dispatch(getTasks(organization_id))
    },
    getRoles: (organization_id) => {
      dispatch(getRoles(organization_id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskGrid);
