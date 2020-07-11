import { Box, Button, Form, Heading, List, Main, Text, TextInput } from 'grommet';
import { Add, Checkmark } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getRoles } from '../actions/role.actions';
import { addTask, deleteTask, getTask, getTasks } from '../actions/task.actions';
import { goToTask } from '../actions/ui.actions';
import { getAllRoles, getAllTasks } from '../reducers/reducers';
import Spinner from './Spinner';
import Error from './Error';


const Tasks = ({ organization, tasks, addTask, getTasks, getRoles, roles, isFetching, errors }) => {

  const [value, setValue] = useState({
    organization: organization.id,
    name: '',
    checks: [
      {prompt: '', resultType: 'BOOLEAN', organization: organization.id}
    ]
  });

  useEffect(() => {
    getTasks()
    getRoles()
  }, [getTasks, getRoles]);

  const renderChildren = (datum, index) => {
    return (
      <Box direction="row" align="center" gap="medium">
        <Checkmark /><Text>{datum.name}</Text>
      </Box>
    )
  }

  return (
    <Main pad="medium">
      <Box flex={false}>
        <Box direction="row" align="center" gap="large">
          <Heading>Tasks</Heading>
          <Spinner isFetching={isFetching} error={errors} />
        </Box>
        <Error message={errors} />
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
      </Box>
      
    </Main>
  )

};

const mapStateToProps = state => ({
  organization: state.organization.organization,
  user: state.user.user,
  tasks: getAllTasks(state),
  roles: getAllRoles(state),
  isFetching: state.tasks.isFetching,
  errors: state.tasks.errors
});

export default connect(mapStateToProps, {addTask, getTasks, getTask, deleteTask, getRoles})(Tasks);
