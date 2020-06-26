import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Form, Heading, List, Main, Text, TextInput } from 'grommet';
import { Add, Subtract } from 'grommet-icons';
import { addTask, getTasks, deleteTask } from '../actions/actions'


const Tasks = ({ organization, tasks, addTask, getTask, deleteTask }) => {

  const [value, setValue] = useState({
    name: ''
  });

  useEffect(() => {
    getTasks(organization.id)
  }, [organization.id]);

  const renderChildren = (datum, index) => {
    return (
      <Box direction="row" justify="between" align="center">
        <Text>{datum.name}</Text>
        <Button
          size="small"
          icon={<Subtract />}
          primary
          color="status-critical"
          onClick={() => {
            deleteTask(datum.id)
          }}
        />
      </Box>
    )
  }

  return (
    <Main pad="medium" fill="horizontal" >
      <Heading>Tasks</Heading>
      <Box direction="column" gap="large">
        <Form
          onSubmit={({value, touch}) => {
            addTask({
              organization: organization.id,
              name: value.name
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
        />
      </Box>
    </Main>
  )

};

const mapStateToProps = state => {
  return {
    organization: state.organization,
    user: state.user,
    tasks: state.tasks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTask: (task) => {
      dispatch(addTask(task))
    },
    getTasks: (organization_id) => {
      dispatch(getTasks(organization_id))
    },
    deleteTask: (task_id) => {
      dispatch(deleteTask(task_id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
