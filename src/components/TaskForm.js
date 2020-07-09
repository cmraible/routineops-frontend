import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Form, FormField, Heading, TextArea, TextInput } from 'grommet';
import { Trash, Save } from 'grommet-icons';
import { saveTask, deleteTask, getTask } from '../actions/task.actions';
import { goToTasks } from '../actions/ui.actions';


const TaskForm = ({ task, saveTask, deleteTask, getTask }) => {

  useEffect(() => {
    getTask(task.id)
  }, [getTask]);
  
  // Set up state for Task form
  const [taskValue, setTaskValue] = useState({
    id: task.id,
    name: task.name,
    description: (task && task.description) ? task.description : ''
  })

  // Define function to delete a task
  const onDelete = (task_id) => {
    deleteTask(task_id)
    goToTasks()
  }

  // Define what happens when the task form is submitted
  const submitForm = (value) => {
    console.log(value);
    saveTask(value)
  }

  return (
        <Box pad="medium" fill="horizontal">
         <Heading level={2}>Task Information</Heading>
          <Form
            value={taskValue}
            onChange={ nextValue => setTaskValue(nextValue) }
            onSubmit={({value}) => submitForm(value)}
          >
            <FormField label="Task Name">
              <TextInput name="name" />
            </FormField>
            <FormField label="Task Description">
              <TextArea name="description" />
            </FormField>
            <Box justify="between" direction="row">
              <Button color="status-ok" icon={<Save />} label="Save" pad="small" primary type="submit" />
              <Button color="status-critical" icon={<Trash size="small" />} primary pad="small" onClick={() => onDelete(task.id)} />
            </Box>
          </Form>
        </Box>
  )

};

const mapStateToProps = (state) => ({
  
})

export default connect(mapStateToProps, {
  saveTask,
  deleteTask,
  getTask
})(TaskForm)
