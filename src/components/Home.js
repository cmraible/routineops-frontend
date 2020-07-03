import React, { useState } from 'react';
import { connect } from 'react-redux';
import { parseISO, format } from 'date-fns';
import { Box, Heading, List, Main, Text } from 'grommet';
import { getTaskInstancesForAssignee } from '../reducers/reducers';
import TaskInstanceOverlay from './TaskInstanceOverlay';

const Home = ({ tasks, taskInstances, taskLayers }) => {

  const [openTaskInstance, setOpenTaskInstance] = useState()

  const onOpenTaskInstance = (event) => setOpenTaskInstance(event.item);

  const onCloseTaskInstance = () => setOpenTaskInstance(undefined);

  return (
    <Main pad="medium" fill="horizontal" margin={{bottom: "large"}} >
      <Heading>My Tasks</Heading>
      {
        (taskInstances &&
          <List 
            data={taskInstances}
            onClickItem={onOpenTaskInstance}
            primaryKey="name"
            children={(taskInstance) => {
              if (taskInstance) {
                const taskLayer = taskLayers[taskInstance.taskLayer]
                const task = tasks[taskLayer.task]
                return (
                <Box align="center" direction="row" justify="between">
                  <Box>
                  <Heading level={3}>{ task.name }</Heading>
                  </Box>
                  
                  <Text>Due: { format(parseISO(taskInstance.due), 'M/d/yyyy') }</Text>
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

export default connect(mapStateToProps, {})(Home);
