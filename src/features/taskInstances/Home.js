import { push } from 'connected-react-router';
import { Box, Button, Text } from 'grommet';
import { Add, CircleInformation } from 'grommet-icons';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Page from '../../components/Page';
import Spinner from '../../components/Spinner';
import { fetchTaskLayers } from '../taskLayers/taskLayersSlice';
import { fetchTasks } from '../tasks/tasksSlice';
import TaskInstanceItem from './TaskInstanceItem';
import { fetchTaskInstances, selectAllTaskInstances } from './taskInstancesSlice';

const Home = () => {
  const dispatch = useDispatch()
  const taskInstances = useSelector(selectAllTaskInstances).sort((a, b) => {
    const aDue = DateTime.fromISO(a.due)
    const bDue = DateTime.fromISO(b.due)
    return aDue < bDue ? -1 : aDue > bDue ? 1 : 0;
  });

  // const user = useSelector(selectLoggedInUser);


  const [requestStatus, setRequestStatus] = useState('idle');

  useEffect(() => {
    const fetch = async () => {
      setRequestStatus('pending');
      const taskAction = await dispatch(fetchTasks());
      const taskLayerAction = await dispatch(fetchTaskLayers());
      const taskInstanceAction = await dispatch(fetchTaskInstances());
      if (fetchTasks.fulfilled.match(taskAction) && fetchTaskLayers.fulfilled.match(taskLayerAction) && fetchTaskInstances.fulfilled.match(taskInstanceAction)) {
        setRequestStatus('succeeded')
      } else {
        setRequestStatus('failed');
      }
    }
    fetch()
  }, [dispatch]);

  let content
  if (requestStatus === 'pending') {
    // Display a spinner to indicate loading state
    content = <Spinner pad="large" size="large" color="status-unknown" />
  } else if (requestStatus === 'succeeded') {
    if (taskInstances.length > 0) {
      // Display list of task instances
      var items = []
      taskInstances.forEach((taskInstance) => {
        items.push(<TaskInstanceItem id={taskInstance.id} key={taskInstance.id} />)
      });
      content = <Box>{items}</Box>
    } else {
      // Display empty message
      content = (
        <Box gap="medium" align="center" pad="medium">
          <CircleInformation />
          <Text size="large">You don't have any tasks yet.</Text>
          <Button size="large" icon={<Add/>} label="Add Task" onClick={() => dispatch(push('/tasks/add'))} />
        </Box>
      )
    }
  } else if (requestStatus === 'failed') {
    // Display an error message
    content = <Message type="error" message="Unable to fetch task instances." />
  }


  return (
    <Page
      title="Home"
      // action={{
      //   icon: <Filter />,
      //   primary: false
      // }}
    >
      <Box flex={false}>
        {content}
      </Box>



          {/* {
        (userInstances &&
          <List
            pad="none"
            data={taskInstances}
            onClickItem={({item}) => dispatch(push(`/taskInstance/${item.id}`))}
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
            empty={(
              <Box gap="medium" align="center" pad="medium">
                <CircleInformation />
                <Text size="large">You don't have any tasks yet.</Text>
                <Button size="large" icon={<Add/>} label="Add Task" onClick={() => dispatch(push('/tasks/add'))} />
              </Box>
            )}
          />
        )
      }
      {
        taskInstances.length === 0 &&
        <Box gap="medium" pad="medium" align="center">
            <CircleInformation />
          <Text size="large">You don't have any tasks yet.</Text>
          <Button size="large" icon={<Add/>} label="Add Task" onClick={() => dispatch(push('/tasks/add'))} />
        </Box>
      } */}


    </Page>
  )

};

export default Home;