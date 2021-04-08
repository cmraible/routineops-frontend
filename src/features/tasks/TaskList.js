import { push } from 'connected-react-router';
import { Box, Button, Text } from 'grommet';
import { Add, CircleInformation } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Page from '../../components/Page';
import Spinner from '../../components/Spinner';
import TaskItem from './TaskItem';
import { fetchTasks, selectTaskIds } from './tasksSlice';

const TaskList = () => {

  const dispatch = useDispatch();
  const taskIds = useSelector(selectTaskIds);

  const [requestStatus, setRequestStatus] = useState('idle');

  useEffect(() => {
    const fetch = async () => {
      setRequestStatus('pending');
      const resultAction = await dispatch(fetchTasks())
      if (fetchTasks.fulfilled.match(resultAction)) {
        setRequestStatus('succeeded')
      } else {
        setRequestStatus('failed');
      }
    }
    fetch()
  }, [dispatch])

  let content
  if (requestStatus === 'pending') {
    // Display a spinner to indicate loading state
    content = <Spinner pad="large" size="large" color="status-unknown" />
  } else if (requestStatus === 'succeeded') {
    if (taskIds.length > 0) {
      // Display list of tasks
      var items = []
      taskIds.forEach((taskId) => {
        items.push(<TaskItem id={taskId} key={taskId} />)
      })
      content = <Box>{items}</Box>
    } else {
      // Display a message saying there are no tasks
      content = (
        <Box gap="medium" align="center" pad="medium">
          <CircleInformation />
          <Text size="large">You don't have any tasks yet.</Text>
          <Button size="large" icon={<Add/>} label="Add Task" onClick={() => dispatch(push('/tasks/add'))} />
        </Box>
      )
    }
  } else if (requestStatus === 'failed') {
    content = <Message type="error" message="Unable to fetch tasks." />
  }

  return (
    <Page
      title={"Tasks"}
    >
      <Box>
        {content}
      </Box>
    </Page>
  )
};

export default TaskList;
