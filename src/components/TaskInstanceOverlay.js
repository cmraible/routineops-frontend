import React, { useEffect } from 'react';
import { Box, Button, Heading, Layer } from 'grommet';
import { Close } from 'grommet-icons';
import { saveTask } from '../actions/task.actions';
import { getChecks } from '../actions/check.actions';
import { connect } from 'react-redux';
import { getAllChecks } from '../reducers/reducers';
import Checklist from './Checklist';
import Confirm from './Confirm';

const TaskInstanceOverlay = ({ checks, getChecks, taskInstance, onClose, taskLayers, taskTypes, tasks }) => {

  useEffect(() => {
    getChecks()
  }, [getChecks])

  const taskLayer = taskLayers[taskInstance.taskLayer]
  const task = tasks[taskLayer.task]
  const taskType = taskTypes[task.taskType]
  const taskChecks = checks.filter((check) => check.taskType === taskType.id)

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
  taskTypes: state.taskTypes.byId,
  tasks: state.tasks.byId,
  checks: getAllChecks(state)
})

export default connect(mapStateToProps, {saveTask: saveTask, getChecks: getChecks})(TaskInstanceOverlay)
