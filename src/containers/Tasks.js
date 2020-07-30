import { Box, Button, Form, List, Text, TextInput } from 'grommet';
import { Add, Checkmark } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getRoles } from '../actions/role.actions';
import { addTask, deleteTask, getTask, getTasks } from '../actions/task.actions';
import { goToTask } from '../actions/ui.actions';
import { getAllRoles, getAllTasks } from '../reducers/reducers';
import Page from '../components/Page';


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

  const handleSubmit = ({value}) => {
    addTask({
      organization: organization.id,
      name: value.name,
      checks: [
        {prompt: `Did you ${value.name.toLowerCase()}?`, resultType: 'BOOLEAN', organization: organization.id}
      ]
    });
    setValue({name: ''});
  }

  return (
    <Page title="Tasks">
      <Box flex={false}>
        <Box direction="column" gap="medium">
          <Form
            onSubmit={handleSubmit}
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
    </Page>
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
