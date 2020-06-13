import React from 'react';
import { Button, Form, FormField, Heading, Main, Select, TextInput } from 'grommet';
import { connect } from 'react-redux';
import { addTask } from '../actions/actions';

const AddTask = (props) => {


  return (
    <Main pad="large">
      <Heading>Add Task</Heading>
      <Form
          onSubmit={({value, touch}) => {
            props.addTask(value)
          }}
      >
        <FormField label="Description">
          <TextInput name="description"  />
        </FormField>
        <FormField label="Role">
          <Select
            options={["Technician", "Mechanic", "Supervisor", "Manager"]}
          />
        </FormField>
        <FormField label="Recurrence">
          <Select
            options={["Daily", "Weekly", "Bi-Weekly", "Monthly", "Quarterly"]}
          />
        </FormField>
        <Button label="Save" primary size="large" type="submit"  />
      </Form>
    </Main>
  )

};

const mapStateToProps = state => {
  return {
    darkMode: state.darkMode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTask: () => {
      dispatch(addTask())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
