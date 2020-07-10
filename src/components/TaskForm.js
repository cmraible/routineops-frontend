import { Box, Button, Form, FormField, Heading, TextArea, TextInput } from 'grommet';
import { Save, Trash } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { deleteTask, getTask, saveTask } from '../actions/task.actions';
import { goToTasks } from '../actions/ui.actions';
import ConfirmDelete from './ConfirmDelete';


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

  // Setup state for delete confirm overlay
  const [openDelete, setOpenDelete] = useState()
  const onOpenDelete = (event) => setOpenDelete(true);
  const onCloseDelete = () => setOpenDelete(undefined);

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
        <Box>
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
              <Button color="status-critical" icon={<Trash size="small" />} primary pad="small" onClick={onOpenDelete} />
            </Box>
          </Form>
          {
            openDelete && 
            <ConfirmDelete 
              onClick={() => onDelete(task.id)} 
              onClose={onCloseDelete}
              message="This action will permanently delete this task and all data associated with it."
            />
          }

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
