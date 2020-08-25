import { Box, List, Text } from 'grommet';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteTask, getTask, saveTask } from '../actions/task.actions';
import { getAllTaskLayers } from '../reducers/reducers';
import TaskLayerOverlay from './TaskLayerOverlay';


const TaskLayers = ({ task, taskLayers, rolesById, allRoles }) => {

  const layers = (taskLayers) ? taskLayers.filter((layer) => layer.task === task.id) : [];

  // Set up state for Schedule overlay
  const [openLayer, setOpenLayer] = useState()
  const onOpenLayer = (event) => setOpenLayer(event.item)
  const onCloseLayer = () => setOpenLayer(undefined)

  return (
        <Box>
          <List
            data={layers}
            children={(layer) => {
              return (
              <Box pad="medium" direction="row" justify="between">
                <Text>{rolesById[layer.role].name}</Text>
                <Text>{(layer) ? layer.label : ''}</Text>
              </Box>
            )
            }}
            onClickItem={onOpenLayer}
          />
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
  taskLayers: getAllTaskLayers(state),
  rolesById: state.roles.byId,
  allRoles: state.roles.allIds
})

export default connect(mapStateToProps, {
  saveTask,
  deleteTask,
  getTask
})(TaskLayers)
