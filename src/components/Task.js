import { Box, Main } from 'grommet';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRoles } from '../actions/role.actions';
import { getTask } from '../actions/task.actions';
import { getTaskLayers } from '../actions/taskLayer.actions';
import { goToTasks } from '../actions/ui.actions';
import { getAllTaskLayers } from '../reducers/reducers';
import BackButton from './BackButton';
import TaskChecks from './TaskChecks';
import TaskForm from './TaskForm';
import TaskLayers from './TaskLayers';


const Task = ({ match, tasksById, getTask, getRoles, getTaskLayers }) => {

  const task_id = match.params.task_id
  const task = tasksById[task_id]

  useEffect(() => {
    getTask(task_id)
    getTaskLayers()
    getRoles()
  }, [getTask]);

  return (
    <Main pad="medium">
      <Box flex={false}> 
        <BackButton onClick={goToTasks} label="Tasks" />
        <TaskForm  task={task} />
        <TaskChecks task={task} />
        <TaskLayers task={task} />       
      </Box>
    </Main>
  )

};

const mapStateToProps = (state) => ({
  tasksById: state.tasks.byId,
  taskLayers: getAllTaskLayers(state)
})

export default connect(mapStateToProps, {
  getTask,
  getTaskLayers,
  getRoles
})(Task)
