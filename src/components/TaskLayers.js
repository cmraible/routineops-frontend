import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Box, Heading, List, Text } from 'grommet';
import { saveTask, deleteTask, getTask } from '../actions/task.actions';
import { getAllTaskLayers } from '../reducers/reducers';
import TaskLayerOverlay from './TaskLayerOverlay';


const TaskLayers = ({ task, taskLayers, rolesById, allRoles }) => {

  console.log(taskLayers)
  const layers = (taskLayers) ? taskLayers.filter((layer) => layer.task === task.id) : [];
  const roles = allRoles.map((id) => rolesById[id])

    // Set up state for Check overlay
    const [openRole, setOpenRole] = useState()
    const onOpenRole = (event) => setOpenRole(event.item)
    const onCloseRole = () => setOpenRole(undefined)

    const roleLayer = (openRole) ? layers.find((layer) => layer.task === task.id && layer.role === openRole.id) : undefined

  return (
        <Box pad="medium" fill="horizontal">
          <Heading level={2}>Schedule</Heading>
          <List
            data={roles}
            children={(role) => {
              const layer = layers.find((layer) => layer.task === task.id && layer.role === role.id)
              return (
              <Box pad="medium" direction="row" justify="between">
                <Text>{(role) ? role.name : ''}</Text>
              <Text>{(layer) ? layer.label : ''}</Text>
              </Box>
            )
            }}
            onClickItem={onOpenRole}
          />
          {
            openRole && (
              <TaskLayerOverlay 
                task={task}
                role={openRole}
                onClose={onCloseRole}
                taskLayer={roleLayer}
              />
            )
           }
        </Box>
        

  )

};

const mapStateToProps = (state) => ({
  taskLayers: getAllTaskLayers(state),
  rolesById: state.roles.byId,
  allRoles: state.roles.allIds
})

export default connect(mapStateToProps, {
  saveTask,
  deleteTask,
  getTask
})(TaskLayers)
