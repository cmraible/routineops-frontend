import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, DataTable, Heading, Main, Text, Select } from 'grommet';
import { getTasks, getRoles } from '../actions/actions'


const TaskMatrix = ({ organization, tasks, roles }) => {

  useEffect(() => {
    getTasks(organization.id)
    getRoles(organization.id)
  }, [organization.id]);

  const roleColumns = roles.map((role) => {
    return {
      align: 'center',
      property: 'role' + role.id,
      header: <Text>{role.name}</Text>,
      render: datum => <Select options={['', 'Daily', 'Weekly', 'Bi-Weekly', 'Monthly', 'Quarterly', 'Annually']}/>
    }
  })

  const columns = [
    {
      align: 'start',
      property: 'Task',
      header: <Text>Task</Text>,
      render: datum => (<Text>{datum.name}</Text>)
    },
    ...roleColumns
  ]

  return (
    <Main pad="medium">
      <Heading>Assign tasks to roles</Heading>
      <DataTable
        columns={columns}
        data={tasks}
        border={true}
      />
    </Main>
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskMatrix);
