import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { parseISO, formatRelative, isBefore, isPast } from 'date-fns';
import { Box, Heading, List, Main, Text } from 'grommet';
import { Checkmark } from 'grommet-icons';
import { getTaskInstancesForAssignee } from '../reducers/reducers';
import TaskInstanceOverlay from './TaskInstanceOverlay';
import { getTaskInstances } from '../actions/taskInstance.actions';
import { getTasks } from '../actions/task.actions';
import { getTaskLayers } from '../actions/taskLayer.actions';
import { getTaskTypes } from '../actions/taskType.actions';

const Home = ({ organization, tasks, taskInstances, taskLayers, getTaskInstances, getTasks, getTaskLayers, getTaskTypes }) => {

  useEffect(() => {
    getTasks(organization.id)
    getTaskLayers(organization.id)
    getTaskInstances(organization.id)
    getTaskTypes(organization.id)
  }, [organization.id]);

  const [openTaskInstance, setOpenTaskInstance] = useState()

  const onOpenTaskInstance = (event) => setOpenTaskInstance(event.item);

  const onCloseTaskInstance = () => setOpenTaskInstance(undefined);

  return (
    <Main pad="medium" fill="horizontal" margin={{bottom: "large"}} >
      <Heading>My Tasks</Heading>
      {
        (taskInstances &&
          <List 
            pad="none"
            data={taskInstances}
            onClickItem={onOpenTaskInstance}
            children={(taskInstance) => {
              if (taskInstance) {
                const taskLayer = taskLayers[taskInstance.taskLayer]
                const task = tasks[taskLayer.task]
                const completed = (taskInstance.completed) ? parseISO(taskInstance.completed) : undefined;
                const due = parseISO(taskInstance.due)
                let color
                if (completed && isBefore(completed, due)) {
                  color = "status-ok"
                } else if (isPast(due)) {
                  color = "status-critical"
                } else {
                  color = "background"
                }
                return (
                <Box align="center" background={color} pad="small" margin="none" direction="row" justify="between">
                  <Box>
                   <Heading level={3}>{ task.name }</Heading>
                  </Box>
                  {(!completed && <Text>Due { formatRelative(parseISO(taskInstance.due), new Date()) }</Text>)}
                  {(completed && <Checkmark size="large"  />)}
                </Box>
                )
              }
            }}
          />
        )
      }
     

      {
        openTaskInstance && (
          <TaskInstanceOverlay taskInstance={openTaskInstance} onClose={onCloseTaskInstance} />
        )
      }
      
    </Main>
  )

};

const mapStateToProps = state => ({
  organization: state.organization,
  user: state.user,
  taskInstances: getTaskInstancesForAssignee(state),
  taskLayers: state.taskLayers.byId,
  tasks: state.tasks.byId
});

export default connect(mapStateToProps, {getTaskInstances: getTaskInstances, getTasks: getTasks, getTaskLayers: getTaskLayers, getTaskTypes: getTaskTypes})(Home);
