import React from 'react';
import { Box, Button, Heading, Layer } from 'grommet';
import { Close } from 'grommet-icons';
import { saveTask } from '../actions/task.actions';
import { connect } from 'react-redux';
import { getAllTaskTypes } from '../reducers/reducers';
import TaskLayerForm from './TaskLayerForm';
import { getAllRoles } from '../reducers/reducers';
import { getTaskLayers, addTaskLayer, saveTaskLayer } from '../actions/taskLayer.actions';
import { getAllTaskLayers } from '../reducers/reducers';



const TaskLayerOverlay = ({ organization, layer, role, onClose, addTaskLayer, saveTaskLayer }) => {

  const onSave = (value) => {
    saveTask(value)
    onClose()
  }

  const taskLayer = (layer) ? layer.taskLayer : undefined
  const task = (layer) ? layer.task : {name: ''}

  return (
    <Layer
      position="center"
      onClickOutside={onClose}
      onEsc={onClose}
      pad="medium"
    >
      <Box align="end">
       <Button icon={(<Close />)} onClick={onClose} />
      </Box>
      <Box flex overflow="scroll" gap="medium" pad="medium">
        <Box>
          <Heading>{task.name}</Heading>
          <TaskLayerForm 
            organization={organization}
            task={task}
            role={role}
            taskLayer={taskLayer}
            addFunction={addTaskLayer}
            saveFunction={saveTaskLayer}
            successFunction={onClose}
          />
        </Box>
      </Box>
    </Layer>
  )

};

const mapStateToProps = state => ({
  organization: state.organization,
  taskTypes: getAllTaskTypes(state),
  roles: getAllRoles(state),
  taskLayers: getAllTaskLayers(state),
  tasks: state.tasks.byId
})

export default connect(mapStateToProps, {
  saveTask,
  addTaskLayer,
  saveTaskLayer
})(TaskLayerOverlay)
