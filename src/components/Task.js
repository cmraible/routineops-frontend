import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Heading, Main } from 'grommet';
import { Previous } from 'grommet-icons';
import { getTask } from '../actions/task.actions';
import { goToTasks } from '../actions/ui.actions';
import TaskForm from './TaskForm';
import TaskChecks from './TaskChecks';
import TaskLayers from './TaskLayers';
import BackButton from './BackButton';
import { getTaskLayers } from '../actions/taskLayer.actions';
import { getAllTaskLayers } from '../reducers/reducers';
import { getRoles } from '../actions/role.actions';


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
        <BackButton onClick={goToTasks} label="Tasks" />
        <TaskForm  task={task} />
        <TaskChecks task={task} />
        <TaskLayers task={task} />       
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
