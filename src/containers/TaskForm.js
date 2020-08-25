import { Box, Form, Menu } from 'grommet';
import { Checkmark, More, Trash, UserAdd } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { deleteTask, getTask, saveTask } from '../actions/task.actions';
import { goToTasks } from '../actions/ui.actions';
import ConfirmDelete from '../components/ConfirmDelete';
import TaskLayerOverlay from './TaskLayerOverlay';
import InlineInput from '../components/InlineInput';

const TaskForm = ({ task, saveTask, deleteTask, getTask, isFetching }) => {
  
  // Set up state for Task form
  const [taskValue, setTaskValue] = useState({
    id: task.id,
    name: task.name,
    description: (task && task.description) ? task.description : ''
  })

  // Set up state for Schedule overlay
  const [openLayer, setOpenLayer] = useState()
  const onOpenLayer = () => setOpenLayer(true)
  const onCloseLayer = () => setOpenLayer(undefined)

  useEffect(() => {
    setTaskValue({
      id: task.id,
      name: task.name,
      description: (task && task.description) ? task.description : ''
    })
  }, [setTaskValue, task]);

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
    saveTask(value);
  }

  const actionItems = [
    {
      label: 'Assign to a role',
      gap: 'small',
      icon: <UserAdd color="text" />,
      onClick: (event) => onOpenLayer(true)
    },
    {
      label: 'Delete task',
      gap: 'small',
      icon: <Trash color="text" />,
      onClick: (event) => onOpenDelete(event)
    }
  ]

  return (
        <Box fill="horizontal">
          <Form
            value={taskValue}
            onChange={ nextValue => setTaskValue(nextValue) }
            onSubmit={({value}) => submitForm(value)}
          >
            <Box direction="row" align="center" justify="between">
              <InlineInput name="name" icon={<Checkmark color="text" />} size="xxlarge" onSave={() => submitForm(taskValue)} />
              <Menu icon={<More />} items={actionItems} />
            </Box>
            <InlineInput placeholder="Add a task description" name="description" size="medium" onSave={() => submitForm(taskValue)} />
          </Form>
          {
            openDelete && 
            <ConfirmDelete 
              onClick={() => onDelete(task.id)} 
              onClose={onCloseDelete}
              message="This action will permanently delete this task and all data associated with it."
            />
          }
          {
            openLayer && (
              <TaskLayerOverlay 
                task={task}
                onClose={onCloseLayer}
                taskLayer={openLayer}
              />
            )
           }

        </Box>
  )

};

const mapStateToProps = (state) => ({
  isFetching: state.tasks.isFetching
})

export default connect(mapStateToProps, {
  saveTask,
  deleteTask,
  getTask
})(TaskForm)
