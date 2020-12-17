import { formatRelative, isBefore, isPast, parseISO } from 'date-fns';
import { Box, Button, Heading, List, Text } from 'grommet';
import { Checkmark, Add, CircleInformation } from 'grommet-icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../components/Page';
import { selectLoggedInUser } from '../auth/authSlice';
import { fetchTaskInstances, selectAllTaskInstances } from '../taskInstances/taskInstancesSlice';
import { fetchTaskLayers, selectTaskLayerEntities } from '../taskLayers/taskLayersSlice';
import { fetchTasks, selectTaskEntities } from '../tasks/tasksSlice';
import history from '../../history';


const Today = () => {
  const dispatch = useDispatch()
  const taskInstances = useSelector(selectAllTaskInstances);
  const user = useSelector(selectLoggedInUser);
  const userInstances = taskInstances.filter((instance) => instance.assignee === user.id);
  const taskEntities = useSelector(selectTaskEntities)
  const taskLayerEntities = useSelector(selectTaskLayerEntities)

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchTaskLayers());
    dispatch(fetchTaskInstances());
  }, [dispatch]);

  return (
    <Page title="Home">
          {
        (userInstances &&
          <List
            pad="none"
            data={taskInstances}
            onClickItem={({item}) => history.push(`/taskInstance/${item.id}`)}
            children={(taskInstance) => {
              if (taskInstance) {
                const taskLayer = taskLayerEntities[taskInstance.taskLayer]
                const task = (taskLayer) ? taskEntities[taskLayer.task] : undefined;
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
                   <Heading level={3}>{ (task) ? task.name : '' }</Heading>
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
        taskInstances.length === 0 &&
        <Box gap="medium" pad="medium" align="center">
            <CircleInformation />
          <Text size="large">You don't have any tasks yet.</Text>
          <Button size="large" icon={<Add/>} label="Add Task" onClick={() => history.push('/tasks/add')} />
        </Box>
      }


    </Page>
  )

};

export default Today;