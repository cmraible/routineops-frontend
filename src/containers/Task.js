import { Accordion, AccordionPanel, Box } from 'grommet';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getRoles } from '../actions/role.actions';
import { getTask } from '../actions/task.actions';
import { getTaskLayers } from '../actions/taskLayer.actions';
import { getAllTaskLayers } from '../reducers/reducers';
import TaskChecks from './TaskChecks';
import TaskForm from './TaskForm';
import TaskLayers from './TaskLayers';
import AccordionHeader from '../components/AccordionHeader'


const Task = ({ task, getRoles, getTaskLayers, taskLayers }) => {

  useEffect(() => {
    getTaskLayers();
    getRoles();
  }, [getTaskLayers, getRoles]);

  const filteredTaskLayers = taskLayers.filter(layer => layer.task === task.id)

  const [activeIndex, setActiveIndex] = useState([]);

  return (
      <Box flex={false}> 
        <TaskForm  task={task} />
        <Accordion
          activeIndex={activeIndex}
          onActive={newActiveIndex => setActiveIndex(newActiveIndex)}
        >
          <AccordionPanel header={<AccordionHeader active={activeIndex.includes(0)} label="Task Questions" />}>
            <TaskChecks task={task} />
          </AccordionPanel>
          <AccordionPanel header={<AccordionHeader active={activeIndex.includes(1)} label="Roles Assigned" count={filteredTaskLayers.length} />}>
            <TaskLayers task={task} />     
          </AccordionPanel>
        </Accordion>
      </Box>    
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
