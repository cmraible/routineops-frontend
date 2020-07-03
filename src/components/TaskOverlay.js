import React, { useState } from 'react';
import { Box, Button, Form, FormField, Heading, Layer, Select, TextInput } from 'grommet';
import { Close } from 'grommet-icons';
import { saveTask } from '../actions/task.actions';
import { connect } from 'react-redux';
import { getAllTaskTypes } from '../reducers/reducers';

const TaskOverlay = ({ task, saveTask, onClose, deleteTask, taskTypes }) => {

  const [value, setValue] = useState({
    id: task.id,
    name: task.name,
    description: (task.description) ? task.description : '',
    taskType: task.taskType
  });

  const onDelete = () => {
    deleteTask(task.id)
    onClose()
  }

  const onSave = (value) => {
    saveTask(value)
    onClose()
  }

  console.log(task)

  return (
    <Layer position="center" onClickOutside={onClose} onEsc={onClose}>
      <Box align="end">
       <Button icon={(<Close />)} onClick={onClose} />
      </Box>
      <Box pad="medium">
        <Heading>Edit task</Heading>
        <Form
          value={value}
          onChange={ nextValue => setValue(nextValue) }
          onSubmit={({value}) => onSave(value)}
        >
        <FormField label="Task Name">
           <TextInput name="name" />
        </FormField>
        <FormField label="Description">
           <TextInput name="description" />
        </FormField>
        <FormField label="Task Type">
           <Select 
            name="taskType"
            options={taskTypes}
            labelKey="name"
            valueKey={{
              key: 'id',
              reduce: true
            }} 
          />
        </FormField>
          <Box border="between" gap="medium">
            <Button color="status-ok" label="Save" pad="small" primary size="large" type="submit" />
            <Button color="status-critical" label="Delete Task" onClick={onDelete} pad="small" primary size="small" />
          </Box>
        </Form>

      </Box>
    </Layer>
  )

};

const mapStateToProps = state => ({
  taskTypes: getAllTaskTypes(state)
})

export default connect(mapStateToProps, {saveTask: saveTask})(TaskOverlay)
