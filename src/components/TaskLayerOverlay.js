import { Box, Button, Heading, Layer } from 'grommet';
import { Close } from 'grommet-icons';
import React from 'react';
import { connect } from 'react-redux';
import { saveTask } from '../actions/task.actions';
import { addTaskLayer, saveTaskLayer } from '../actions/taskLayer.actions';
import { getAllRoles, getAllTaskLayers } from '../reducers/reducers';
import TaskLayerForm from './TaskLayerForm';



const TaskLayerOverlay = ({ organization, taskLayer, task, role, onClose, addTaskLayer, saveTaskLayer }) => {

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
          <Box>
          <Heading level={2}>{task.name}</Heading>
          </Box>
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
  roles: getAllRoles(state),
  taskLayers: getAllTaskLayers(state),
  tasks: state.tasks.byId
})

export default connect(mapStateToProps, {
  saveTask,
  addTaskLayer,
  saveTaskLayer
})(TaskLayerOverlay)
