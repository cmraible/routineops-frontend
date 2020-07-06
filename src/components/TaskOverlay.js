import React, { useState } from 'react';
import { Box, Button, Form, FormField, Heading, Layer, Select, TextInput } from 'grommet';
import { Close } from 'grommet-icons';
import { saveTask } from '../actions/task.actions';
import { connect } from 'react-redux';
import { getAllTaskTypes } from '../reducers/reducers';
import { getAllRoles } from '../reducers/reducers';
import { addTaskLayer, saveTaskLayer } from '../actions/taskLayer.actions';
import { getAllTaskLayers } from '../reducers/reducers';



const TaskOverlay = ({ task, saveTask, onClose, deleteTask, taskTypes, roles, organization, addTaskLayer, saveTaskLayer, taskLayers }) => {

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

  return (
    <Layer position="center" onClickOutside={onClose} onEsc={onClose} pad="medium">
      <Box align="end">
       <Button icon={(<Close />)} onClick={onClose} />
      </Box>
      <Box flex overflow="scroll" gap="medium" pad="medium">
        <Box>
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
          <Box>
            <Button color="status-ok" label="Save" pad="small" primary size="large" type="submit" />
          {/* { <Button color="status-critical" label="Delete Task" onClick={onDelete} pad="small" primary size="small" />} */}
          </Box>
          </Form>
        </Box>
      </Box>
    </Layer>
  )

};

const mapStateToProps = state => ({
  organization: state.organization,
  taskTypes: getAllTaskTypes(state),
  roles: getAllRoles(state),
  taskLayers: getAllTaskLayers(state)
})

export default connect(mapStateToProps, {
  saveTask,
  addTaskLayer,
  saveTaskLayer
})(TaskOverlay)
