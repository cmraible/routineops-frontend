import { Box, Button, Heading, Layer } from 'grommet';
import { Close } from 'grommet-icons';
import React from 'react';
import { connect } from 'react-redux';
import { saveTask } from '../actions/task.actions';
import { addTaskLayer, saveTaskLayer } from '../actions/taskLayer.actions';
import { getAllRoles, getAllTaskLayers } from '../reducers/reducers';
import TaskLayerForm from '../components/TaskLayerForm';



const TaskLayerOverlay = ({ organization, taskLayer, task, rolesById, roles, onClose, addTaskLayer, saveTaskLayer }) => {

  const role = (taskLayer) ? rolesById[taskLayer.role] : undefined;

  return (
    <Layer
      position="center"
      onClickOutside={onClose}
      onEsc={onClose}
      pad="medium"
    >
      <Box flex={false} width="large">
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
              taskLayer={taskLayer}
              role={role}
              roles={roles}
              addFunction={addTaskLayer}
              saveFunction={saveTaskLayer}
              successFunction={onClose}
            />
          </Box>
        </Box>
      </Box>
      
    </Layer>
  )

};

const mapStateToProps = state => ({
  organization: state.organization.organization,
  roles: getAllRoles(state),
  rolesById: state.roles.byId,
  taskLayers: getAllTaskLayers(state),
  tasks: state.tasks.byId,
})

export default connect(mapStateToProps, {
  saveTask,
  addTaskLayer,
  saveTaskLayer
})(TaskLayerOverlay)
