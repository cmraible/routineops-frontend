import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Form, Heading, List, Main, Text, TextInput } from 'grommet';
import { Add, Checkmark } from 'grommet-icons';
import { addTask, getTasks, getTask, deleteTask } from '../actions/task.actions'
import { getAllTasks } from '../reducers/reducers';
import { goToTask } from '../actions/ui.actions';
import { getRoles } from '../actions/role.actions';
import { getAllRoles } from '../reducers/reducers';


const Tasks = ({ organization, tasks, addTask, getTasks, getRoles, roles }) => {

  const [value, setValue] = useState({
    organization: organization.id,
    name: '',
    checks: [
      {prompt: '', resultType: 'BOOLEAN', organization: organization.id}
    ]
  });

  useEffect(() => {
    getTasks(organization.id)
    getRoles(organization.id)
  }, [getTasks, organization.id]);

  const renderChildren = (datum, index) => {
    return (
      <Box direction="row" align="center" gap="medium">
        <Checkmark /><Text>{datum.name}</Text>
      </Box>
    )
  }

  return (
    <Main pad="medium" >
      <Heading>Tasks</Heading>
      <Box direction="column" gap="large">
        <Form
          onSubmit={({value, touch}) => {
            addTask({
              organization: organization.id,
              name: value.name,
              checks: [
                {prompt: `Did you ${value.name.toLowerCase()}?`, resultType: 'BOOLEAN', organization: organization.id}
              ]
            })
            setValue({name: ''})
          }}
          value={value}
          onChange={ nextValue => setValue(nextValue) }
        >
          <Box direction="row" gap="small">
            <TextInput required name="name" placeholder="New task" />
            <Button type="submit" size="small" primary icon={<Add />} />
          </Box>
        </Form>
        <List
          primaryKey="name"
          data={tasks}
          children={renderChildren}
          onClickItem={(event) => goToTask(event.item.id)}
        />
      </Box>
    </Main>
  )

};

const mapStateToProps = state => ({
  organization: state.organization,
  user: state.user,
  tasks: getAllTasks(state),
  roles: getAllRoles(state)
});

export default connect(mapStateToProps, {addTask, getTasks, getTask, deleteTask, getRoles})(Tasks);
