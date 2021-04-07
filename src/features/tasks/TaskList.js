import { push } from 'connected-react-router';
import { Box, Button, Text } from 'grommet';
import { Add, CircleInformation } from 'grommet-icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import ListView from '../../components/ListView';
import TaskItem from './TaskItem';
import { fetchTasks, selectAllTasks } from './tasksSlice';

const TaskList = () => {

  const dispatch = useDispatch();

  return (
    <ListView
      title="Tasks"
      pad="none"
      action={{
        icon: <Add />,
        onClick: () => dispatch(push('/tasks/add')),
        label: "Add Task"
      }}
      itemSelector={selectAllTasks}
      fetchAction={fetchTasks}
      onClickItem={(datum, index) => dispatch(push(`/tasks/${datum.item.id}`))}
      renderItem={(task) => (<TaskItem id={task.id} key={task.id} />)}
      empty={(
        <Box gap="medium" align="center" pad="medium">
            <CircleInformation />
          <Text size="large">You don't have any tasks yet.</Text>
          <Button size="large" icon={<Add/>} label="Add Task" onClick={() => dispatch(push('/tasks/add'))} />
        </Box>
      )}
    />
  )
};

export default TaskList;
