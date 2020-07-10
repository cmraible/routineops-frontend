import { Box, Button, Heading, Layer } from 'grommet';
import { Close } from 'grommet-icons';
import React from 'react';
import { connect } from 'react-redux';
import { saveTask } from '../actions/task.actions';
import { getAllChecks } from '../reducers/reducers';
import Checklist from './Checklist';
import Confirm from './Confirm';

const TaskInstanceOverlay = ({ checks, taskInstance, onClose, taskLayers, tasks }) => {

  const taskLayer = taskLayers[taskInstance.taskLayer]
  const task = tasks[taskLayer.task]
  const taskChecks = checks.filter((check) => check.task === task.id)

  return (
    <Layer 
      background="background" 
      position="center" 
      onClickOutside={onClose} 
      onEsc={onClose}
    >
        <Box align="end">
          <Button icon={(<Close />)} onClick={onClose} />
        </Box>
        <Box pad="medium" gap="medium" overflow="scroll">
          <Heading>{task.name}</Heading>
          {(taskChecks.length > 1) && (<Checklist checks={taskChecks} taskInstance={taskInstance} onComplete={() => onClose()} />)}
          {(taskChecks.length === 1) && (<Confirm check={taskChecks[0]} taskInstance={taskInstance} onComplete={() => onClose()} />) }
        </Box>
    </Layer>
  )

};

const mapStateToProps = state => ({
  taskLayers: state.taskLayers.byId,
  tasks: state.tasks.byId,
  checks: getAllChecks(state)
})

export default connect(mapStateToProps, {saveTask: saveTask})(TaskInstanceOverlay)
